import React from 'react';
import '../styles/general.css'
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from "axios"
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { eye } from 'react-icons-kit/feather/eye'
import { useHistory } from 'react-router'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


function Login() {
    // let nav = useNavigate()
    // const [cookies, setCookie] = useCookies('state')
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const cookies = new Cookies();

    useEffect(() => {
        axios.get(`http://w22g7.int3306.freeddns.org/login`, {
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
            },
        })
            .then((res) => {
                console.log(res)
                // setCookie('state', res.data.state, { path: '/' })

                cookies.set('state', res.data.state, { path: '/' });
                // cookies.get('myCat')

                localStorage.setItem('state', (res.data.state));
                window.location.assign(res.data.auth_url)
                window.dispatchEvent(new Event("loggedin"));
            })
            .catch((err) => console.log(err));
        return () => {
        }
    }, [])
    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        }
        else {
            setIcon(eyeOff);
            setType('password');
        }
    }
    return (
        <div>
           
        </div>
    );
}
export default Login