import { useState, useEffect } from 'react';
import './DepartmentInput.scss';
import { IDepartment } from '../../Interfaces/IDepartment';

const DepartmentInput = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="department-input">
      <label htmlFor="department_id" className="form__connexion__label form-label">Votre département *</label>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select className="form-select" id="department" name="department_id" >
          <option value="">Tous les départements</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>{department.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DepartmentInput;
