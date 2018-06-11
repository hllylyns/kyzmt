import React from 'react';
import particles from 'react-particles-js';
import Particles from '../../Particles';

export default function Login() {
    return (
        <div id="particles-js">
            {/* <img src={logo} alt=""/> kyzmt logo and animation goes here */}
            <Particles params={{
                "particles": {
                  "number": {
                    "value": 29,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#ffffff"
                  },
                  "shape": {
                    "type": "star",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 5
                    },
                    "image": {
                      "src": "img/github.svg",
                      "width": 100,
                      "height": 100
                    }
                  },
                  "opacity": {
                    "value": 0.352750653390415,
                    "random": false,
                    "anim": {
                      "enable": false,
                      "speed": 0.40603860615067255,
                      "opacity_min": 0.3329516570435515,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 3,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.02405118091298284,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "grab"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 100,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                },
                "retina_detect": true
              }}/>
       
            <div className="logindiv">
            <h2 className="logintitle">kyzmt</h2>
            <p className="loginsummary">Find the best times for social gatherings with Kyzmt, the app that helps you align schedules with friends.</p><br/>
            <a href={process.env.REACT_APP_LOGIN}>
                <button className="startbutton">START</button>
            </a>
            </div>
           
        </div> 
    )
}