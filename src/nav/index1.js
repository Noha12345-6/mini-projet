import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import helpIcon from '../images/helpIcon.gif';
import profil from '../images/profil.gif';
import utilisateur from '../images/utilisateur.gif';
import Monprofil from '../images/Monprofil.gif';
import analyse from '../images/analyse.gif';
import website from '../images/website.gif';

const Index = () => {
  const user = useSelector((state) => state.user);

  return (
    <Container>
      <Header>
        <Subtitle>
          {user.admin
            ? 'Gérez les utilisateurs et consultez les statistiques'
            : 'Découvrez les fonctionnalités qui sont disponibles'}
        </Subtitle>
      </Header>

      <Main>
        <CardContainer>
          {!user.admin && (
            <>
              <Card>
                <StyledLink to="#">
                  <Image src={Monprofil} alt="Mon Profil" />
                  <Title>Mon Profil</Title>
                  <Description>Consultez et modifiez vos informations personnelles.</Description>
                </StyledLink>
              </Card>

              <Card>
                <StyledLink to="#">
                  <Image src={website} alt="Ressources" />
                  <Title>Ressources</Title>
                  <Description>Accédez à des documents et outils utiles pour votre parcours.</Description>
                </StyledLink>
              </Card>

              <Card>
                <StyledLink to="#">
                  <Image src={helpIcon} alt="Assistance" />
                  <Title>Assistance</Title>
                  <Description>Trouvez des réponses à vos questions et obtenez de l'aide.</Description>
                </StyledLink>
              </Card>
            </>
          )}

          {user.admin && (
            <>
              <Card>
                <StyledLink to="/admin/dashboard">
                  <Image src={analyse} alt="Dashboard" />
                  <Title>Tableau de bord</Title>
                  <Description>Consultez les statistiques et la gestion de la plateforme.</Description>
                </StyledLink>
              </Card>

              <Card>
                <StyledLink to="/admin/liste">
                  <Image src={profil} alt="Utilisateurs" />
                  <Title>Liste des utilisateurs</Title>
                  <Description>Gérez les utilisateurs de la plateforme.</Description>
                </StyledLink>
              </Card>

              <Card>
                <StyledLink to="/admin/ajouter">
                  <Image src={utilisateur} alt="Ajouter Utilisateur" />
                  <Title>Ajouter un utilisateur</Title>
                  <Description>Ajoutez de nouveaux utilisateurs à la plateforme.</Description>
                </StyledLink>
              </Card>
            </>
          )}
        </CardContainer>
      </Main>
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: #f3f4f6;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  width: 250px;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  color: #007bff;
  margin: 15px 0;
  text-align: center;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #555;
  text-align: center;
`;

export default Index;
