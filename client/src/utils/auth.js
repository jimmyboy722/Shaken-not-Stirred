// IMPORTING THE JWT DECODE LIBRARY
import decode from "jwt-decode";

// DEFINING THE AUTH SERVICE CLASS FOR HANDLING AUTHENTICATION
class AuthService {
  getProfile() {
    // USES THE JWT DECODE LIBRARY TO DECODE THE TOKEN STORED IN LOCAL STORAGE
    return decode(this.getToken()); // RETRIEVE THE PAYLOAD FROM THE TOKEN
  }
  loggedIn() {
    // CHECKS IF A USER IS CURRENTLY LOGGED IN
    const token = this.getToken(); // FETCHES THE TOKEN FROM LOCAL STORAGE
    return !!token && !this.isTokenExpired(token);
    // !!TOKEN MAKES SURE IT'S TRUTHY AND !THIS.ISTOKENEXPIRED MAKES SURE THE TOKEN IS NOT EXPIRED
  }
  isTokenExpired(token) {
    // METHOD TO CHECK IF THE TOKEN IS EXPIRED
    try {
      const decoded = decode(token); // DECODES THE TOKEN TO ACCESS THE EXPIRATION FIELD
      if (decoded.exp < Date.now() / 1000) {
        // COMPARING THE EXPIRATION DATE TO THE CURRENT DATE
        return true; // RETURNING TRUE IF THE TOKEN IS EXPIRED
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // RETRIEVING THE TOKEN FROM LOCAL STORAGE
  getToken() {
    return localStorage.getItem("id_token"); // RETURNING THE TOKEN IF IT EXISTS, OTHERWISE RETURNING NULL
  }
  // SETTING THE TOKEN IN LOCAL STORAGE WITH THE ID TOKEN KEY
  login(idToken) {
    localStorage.setItem("id_token", idToken); // STORING THE JWT TOKEN UPON LOGIN
    window.location.assign("/drinks"); // REDIRECTING THE USER TO THE HOME PAGE
  }
  // REMOVING THE TOKEN FROM LOCAL STORAGE, LOGGING THE USER OUT, AND REDIRECTING THEM TO THE LOGIN PAGE
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}
// EXPORTING THE AUTH SERVICE CLASS
const authService = new AuthService();
export default authService;
