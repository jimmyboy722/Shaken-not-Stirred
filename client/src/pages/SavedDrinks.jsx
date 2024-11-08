// THIS COMPONENT RETRIEVES AND DISPLAYS A LIST OF SAVED DRINK RECIPES FOR THE AUTHENTICATED USER, ALLOWING THEM TO DELETE INDIVIDUAL DRINKS FROM THEIR COLLECTION

// IMPORTS
// import Auth from "../utils/auth"; // HANDLES AUTHENTICATION AND TOKEN MANIPULATION
// import { // REACT BOOTSTRAP COMPONENTS
//   
//     Card,
//     Button,
//     Row,
//     Col
// } from "react-bootstrap";

import { useQuery , useMutation } from "@apollo/client"; // IMPORTS FOR QUERIES AND MUTATIONS FOR FETCHING AND UPDATING DATA VIA GRAPHQL
import { REMOVE_DRINK , QUERY_ME} from "../utils/mutations"; // GRAPHQL MUTATION TO DELETE A DRINK 
import { removeDrinkId } from "../utils/localStorage";// FUNCTION TO UPDATE LOCAL STORAGE WITH UPDATED SAVED DRINKS

// STATE MANAGEMENT
const SavedDrinks = () => {
    const { loading, data } = useQuery(QUERY_ME); // FETCHES USER INFO AND SAVED DRINKS, STORING THE LOADING STATE IN LOADING VARIABLE AND RESPONSE DATA IN DATA VARIABLE
    const [removeDrink, { error }] = useMutation(REMOVE_DRINK); // SETTING UP THE MUTATION TO REMOVE A DRINK FROM THE USER'S SAVED COLLECTION WITH ERROR HANDLING

    const userInfo = data?.me || {};
    const deleteDrink = async (drinkId) => { // FUNCTION TO DELETE A DRINK FROM THE USER'S SAVED COLLECTION
        const tkn = Auth.loggedIn() ? Auth.getToken() : null; // IF USER IS LOGGED IN, RETRIEVE THE TOKEN FROM LOCAL STORAGE
        if (!tkn) {// IF NO TOKEN EXISTS, IT EXITS THE FUNCTION
            return false;
        }
// TRY/CATCH FOR MUTATION EXECUTION
        try { 
            const { data } = await removeDrink({ // CALLS REMOVEDRINK MUTATION WITH SPECIFIC DRINK ID
                variables: { drinkId },
            });
            removeDrinkId(drinkId); // IF SUCCESSFUL, CALLS FUNCTION TO REMOVE DRINK FROM LOCAL STORAGE
        } catch (err) { // LOG ERROR IF MUTATION FAILS
            console.error(err);
        }
    };
    // LOADING STATE CHECK
    if (loading) { // IF QUERY IS LOADING, RETURN A LOADING MESSAGE
        return <h2>Loading...</h2>;
    }

    // RENDERED COMPONENT *EDITED!
    return (
        <>
        <div fluid className="text-light bg-dark p-5">
         {/* DISPLAYS PAGE TITLE */}
                <h1>'s Saved Drinks</h1>
            
        </div>
    {/* USING TERNARY OPERATOR TO CHECK IF USER HAS SAVED DRINKS */}
            <h2 className="pt-5">{SavedDrinks?.length
                ? `${SavedDrinks.length}'s Saved ${SavedDrinks.length === 1 ? 'Drink' : 'Drinks'}:`
                : 'No Saved Drinks'}
            </h2>
            <div>
               
            </div>
        
        </>
    );
    };


    // RENDERED COMPONENT
    // return (
    //     <>
    //     <div fluid className="text-light bg-dark p-5">
    //         <Container> {/* DISPLAYS PAGE TITLE */}
    //             <h1>{userData.username}'s Saved Drinks</h1>
    //         </Container>
    //     </div>
    //     <Container>{/* USING TERNARY OPERATOR TO CHECK IF USER HAS SAVED DRINKS */}
    //         <h2 className="pt-5">{userData.savedDrinks?.length
    //             ? `${userData.savedDrinks.length}'s Saved ${userData.savedDrinks.length === 1 ? 'Drink' : 'Drinks'}:`
    //             : 'No Saved Drinks'}
    //         </h2>
    //         <div>
    //             <Row>{/* MAPS THROUGH USER SAVED DRINKS AND RENDERS CARD FOR EACH DRINK */}
    //                 {userData.savedDrinks?.map((drink) => {
    //                     return (
    //                         <Col md="4">
    //                             <Card key={drink._id} border="dark">
    //                                 {drink.image ? (
    //                                     <Card.Img {/* IF DRINK HAS AN IMAGE, DISPLAYS IT */}
    //                                         src={drink.image}
    //                                         alt={`Example pic of ${drink.title}`}
    //                                         variant="top"
    //                                     />
    //                                 ) : null}
    //                                 <Card.Body>{/* DISPLAYS DRINK INFORMATION INCLUDING TITLE, AUTHOR, AND DESCRIPTION */}
    //                                     <Card.Title>{drink.title}</Card.Title>
    //                                     <p className="small">Author: {drink.authors}</p>
    //                                     <Card.Text>{drink.description}</Card.Text>
    //                                     {/* BUTTON TO DELETE DRINK */}
    //                                     <Button className="btn-block btn-danger" onClick={() => deleteDrink(drink.drinkId)}>
    //                                         Delete this Drink!
    //                                     </Button>
    //                                 </Card.Body>
    //                             </Card>
    //                         </Col>
    //                     );
    //                 })}
    //             </Row>
    //         </div>
    //     </Container>
    //     </>
    // );
    // };

export default SavedDrinks;