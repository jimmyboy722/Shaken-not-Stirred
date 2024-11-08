// THIS COMPONENT ALLOWS USERS TO SEARCH FOR DRINKS, VIEW SEARCH RESULTS AND SAVE FAVORITES

// IMPORTS
import { useState, useEffect } from 'react';// USED FOR MANAGING COMPONENT STATE AND EFFECTS

// import {// BOOTSTRAP COMPONENTS FOR STYLING
//   Container,
//   Form,
//   Button,
//   Row,
//   Col,
// } from 'react-bootstrap';


import { useMutation } from '@apollo/client';// HANDLES SAVING DRINKS TO THE USER'S ACCOUNT
import { SAVE_DRINK } from '../utils/mutations';
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage'; // FOR PERSISTING SAVED DRINK ID'S LOCALLY

// import Auth from '../utils/auth'; // HANDLES AUTHENTICATION(CHECKING LOGIN AND TOKEN MANAGEMENT)

// COMPONENT STATE INITIALIZATION
const SearchDrinks = () => {

  const [searchedDrinks, setSearchedDrinks] = useState([]);// STORES THE LIST OF SEARCHED DRINKS
 
  const [searchInput, setSearchInput] = useState(''); // MANAGES THE USER'S INPUT IN THE SEARCH FIELD

  const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkIds()); // HOLDS ID'S OF SAVED DRINKS

  const [saveDrink, { error }] = useMutation(SAVE_DRINK); // APOLLO MUTATION FUNCTION TO SAVE A DRINK TO USER ACCOUNT

  // FOR LOCAL STORAGE
  useEffect(() => {
    return () => saveDrinkIds(savedDrinkIds); // UPDATES LOCAL STORAGE WITH SAVED DRINK ID'S WHENEVER IT CHANGES
  });

  // FORM SUBMISSION HANDLER
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await fetch(
        // how are we going to search for drinks?? API for drink recipes?
      );

      if (!response.ok) {
        throw new Error('oops...try again!');
      }

      const { items } = await response.json();
      // IF THE SEARCH SUCCEEDS, IT EXTRACTS THE DATA FROM THE RESPONSE AND MAPS IT INTO DRINKDATA
      const drinkData = items.map((drink) => ({
        drinkId: drink.id,
        authors: drink.authors || ['No author associated with this drink'], // MESSAGE TO DISPLAY IF NO AUTHOR IS ASSOCIATED WITH DRINK
        title: drink.title,
        description: drink.description,
        image: drink.imageLinks?.thumbnail || 'No image available',
      }));

      setSearchedDrinks(drinkData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

    // SAVE DRINK HANDLER
  const handleSaveDrink = async (drinkId) => {
    // FINDS DRINK BY DRINKID IN SEARCHEDDRINKS
    const drinkToSave = searchedDrinks.find((drink) => drink.drinkId === drinkId);

    // VERIFIES USER IS LOGGED IN
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    // MUTATION TO SAVE SELECTED DRINK
    try {
      const { data } = await saveDrink({
        variables: { drinkData: { ...drinkToSave } },
      });
      console.log(savedDrinkIds);
      // ADDS SELECTED DRINK ID TO SAVED DRINK ID LIST, WHICH IS ALSO SYNCED WITH LOCAL STORAGE
      setSavedDrinkIds([...savedDrinkIds, drinkToSave.drinkId]);
    } catch (err) { // ERRORS HANDLING
      console.error(err);
    }
  };

  // RENDERED COMPONENT
  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for a Drink!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a drink"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedDrinks.length
            ? `Viewing ${searchedDrinks.length} results:`
            : 'Search for a drink to begin'}
        </h2>
        <Row>
          {searchedDrinks.map((drink) => {
            return (
              <Col md="4" key={drink.drinkId}>
                <Card border="dark" className='mb-3'>
                  {drink.image ? (
                    <Card.Img
                      src={drink.image}
                      alt={`The example picture of ${drink.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{drink.title}</Card.Title>
                    <p className="small">Authors: {drink.authors}</p>
                    <Card.Text>{drink.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedDrinkIds?.some(
                          (savedId) => savedId === drink.drinkId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveDrink(drink.drinkId)}
                      >
                        {savedDrinkIds?.some((savedId) => savedId === drink.drinkId)
                          ? 'Drink Already Saved!'
                          : 'Save This Drink!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchDrinks;
