import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";

import {Card, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {Context} from "../index";

const Auth = observer( () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Сделать еще под логин
    // Сделать одну функцию
    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password)
                console.log('isLogin ')
            }else {
                data = await registration(email, password)
                console.log('!isLogin ')
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }catch (e) {
            console.log('catch error click() ' + e)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Location" : "Registration" }</h2>

                    <Form className="d-flex flex-column mt-2 mb-3">
                        <Form.Control
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-2" placeholder="input email">

                        </Form.Control>
                        <Form.Control
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-2" placeholder="input password">

                        </Form.Control>
                        <Row>
                            {isLogin ?
                                <div>
                                    No account ? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
                                </div>
                                :
                                <div>
                                Yes account ? <NavLink to={LOGIN_ROUTE}>login in</NavLink>
                                </div>
                            }
                            <Button
                                onClick={click}
                                className="mt-3 align-self-end">{isLogin ? 'Login' : 'Registration'}</Button>

                        </Row>
                    </Form>
            </Card>
        </Container>
    );
});

export default Auth;