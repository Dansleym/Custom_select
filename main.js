import "./select.css";
import CustomSelect from "./select";

new CustomSelect(".select", null);

new CustomSelect(".select-with-request", null, (e) => {
  console.log("this event triggered from main file when clicked on li");

  // return true for selecting value and autoclosing
  // return false for preventing selecting value and autoclosing

  return true;
});
