import { ToastComponent } from "@syncfusion/ej2-react-notifications"; 
import "@syncfusion/ej2-diagrams/styles/material.css"; 
import "@syncfusion/ej2-base/styles/material.css"; 
import "@syncfusion/ej2-popups/styles/material.css"; 
import "@syncfusion/ej2-splitbuttons/styles/material.css"; 
import "@syncfusion/ej2-navigations/styles/material.css"; 


const TOAST_TYPES = {
    warning: "e-toast-warning",
    success: "e-toast-success",
    error:   "e-toast-danger",
    info:    "e-toast-infor",
};

const Toast = ({ errorMessage, type, onClose }) => {
 let toastInstance;

 let position = { X: "Center" };

 function toastCreated() {
   toastInstance.show();
 }

 function toastDestroyed(e) {
   e.clickToClose = true;
   onClose && onClose();
 }

 return (
   <div>
     <ToastComponent
       ref={(toast) => (toastInstance = toast)}
       title={type.toUpperCase()}
       content={errorMessage}
       position={position}
       created={toastCreated.bind(this)}
       click={toastDestroyed.bind(this)}
       showCloseButton
       cssClass={TOAST_TYPES[type] || TOAST_TYPES["info"]}
     />
   </div>
 );
};
export default Toast;