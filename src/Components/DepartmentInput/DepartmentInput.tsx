import { useState, useEffect } from 'react';
import './DepartmentInput.scss';

const DepartmentInput = () => {
  const [department, setDepartment] = useState('');
  const [departmentsList, setDepartmentsList] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
        const data = await response.json();
        setDepartmentsList(data);
        setFilteredDepartments(data); // Initially, show all departments
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDepartment(value);

    // Debounce function
    clearTimeout(window.debounceTimeout);
    window.debounceTimeout = setTimeout(() => {
      if (value) {
        const filtered = departmentsList.filter(dept =>
          dept.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredDepartments(filtered);
      } else {
        setFilteredDepartments(departmentsList); // Reset to all departments
      }
    }, 300); // Adjust the delay as needed
  };

  const handleDepartmentSelect = (e) => {
    setDepartment(e.target.value); // Set the selected department
  };

  const highlightMatch = (name) => {
    const parts = name.split(new RegExp(`(${department})`, 'i'));
    return parts.map((part, index) => 
      part.toLowerCase() === department.toLowerCase() ? 
      <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="department-input">
      <label htmlFor="department_id" className="form__connexion__label" >Votre département *</label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select 
          className="form__connexion__input" 
          id="department_id" 
          name="department_id" 
          value={department} 
          onChange={handleDepartmentSelect}
        >
          <option className="form__connexion__input" value="">Tous les départements</option>
          {filteredDepartments.map(dept => (
            <option key={dept.id} value={dept.name}>
              {highlightMatch(dept.name)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DepartmentInput;


