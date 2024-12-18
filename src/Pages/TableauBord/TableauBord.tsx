import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import { useEffect, useState } from "react";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { useAuth } from "../../Context/AuthContext.tsx";
import { Navigate, Routes, Route } from "react-router-dom";
import ManageAnimal from "../../Components/ManageAnimal/ManageAnimal.tsx";
import ManageRequest from "../../Components/ManageRequest/ManageRequest.tsx";
import Association from "../Association/Association.tsx";

const TableauBord = () => {
    const { userData } = useAuth();

    const [associationData, setAssociationData] = useState(userData?.association);

    const [isAssociationConnected, setIsAssociationConnected] = useState<boolean | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (!storedUser || !(storedUser.role === "association")) {
            setIsAssociationConnected(false);
        } else {
            setIsAssociationConnected(true);
        }
    }, []);

    if (isAssociationConnected === false) {
        return <Navigate to="/connexion" />;
    }

    return (
        <>
            <Helmet>
                <title>Tableau de bord | PetFoster Connect</title>
                <meta
                    name="description"
                    content="Accédez au tableau de bord de votre association sur PetFoster Connect pour gérer vos animaux, demandes et profil."
                />
            </Helmet>

            <Header />
            <div className="content">
                <LeftNavBar />
                <main className="main__content container">
                    <h1 className="main__title">
                        Tableau de bord | {userData ? associationData?.name : "XXX"}
                    </h1>
                    <Routes>
                        <Route path="/" element={<ManageAnimal />} />
                        <Route path="/demandes" element={<ManageRequest />} />
                        <Route
                            path="/profil-association/:slug"
                            element={
                                <Association
                                    isDashboard={true}
                                    setAssociationData={setAssociationData}
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default TableauBord;
