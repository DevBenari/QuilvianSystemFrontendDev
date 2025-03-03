import React from "react";

const ModulKiosk = ({ children }) => {
  return (
    <div >
      <div className="dashboard-container">
       
        <div className="particles-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDuration: Math.random() * 10 + 10 + 's',
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

     
        <div className="glow-effect glow-effect-1"></div>
        <div className="glow-effect glow-effect-2"></div>
        <div className="glow-effect glow-effect-3"></div>
        {children}
      </div>
    </div>
  )  
}

export default ModulKiosk;