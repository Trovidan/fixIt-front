import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import '../css/chat.css'

const Chat = (props)=>{
     
    return (
        <div className="chat-page">
        <Row className="chat-container" style={{minHeight: "80vh"}}>
            <Col className="recepient-container" md={4}>
                    <div className="recepient-header">
                        <AccountCircleSharpIcon fontSize="large" color="action"/>
                        <span className="chat-user-name">User Name</span>
                    </div>
                    <div className="recepient">
                        <AccountCircleSharpIcon fontSize="large" color="action" />
                        <span className="chat-receiver-name">Receiver Name</span>                   
                    </div> 
                    <div className="recepient">
                        <AccountCircleSharpIcon fontSize="large" color="action" />
                        <span className="chat-receiver-name">Receiver Name</span>
                    </div> 
                    <div className="recepient">
                        <AccountCircleSharpIcon fontSize="large" color="action" />
                        <span className="chat-receiver-name">Receiver Name</span>
                    </div> 
                    <div className="recepient">
                        <AccountCircleSharpIcon fontSize="large" color="action" />
                        <span className="chat-receiver-name">Receiver Name</span>
                    </div> 
            </Col>
            <Col className="message-container" md={8}>
                <div className="message-header">
                    <AccountCircleSharpIcon fontSize="large" color="action" />
                    <span className="chat-user-name">Recepient Name</span>
                </div>
                <div className="message message-right">
                    <div className="message-content received">
                        This is received message;
                    </div>
                </div>
                <div className="message message-left">
                    <div className="message-content sent">
                        This is the sent message;
                    </div>
                </div>
                <div className="message message-right">
                    <div className="message-content received">
                        This is received message;
                </div>
                </div>
                <div className="message message-left">
                    <div className="message-content sent">
                            This is the sent message;This is the sent message;This is the sent message;This is the sent message;This is the sent message;
                            This is the sent message;This is the sent message;This is the sent message;This is the sent message;This is the sent message;
                </div>
                </div>
            </Col>
        </Row>
        </div>
    )  
}

export default Chat;