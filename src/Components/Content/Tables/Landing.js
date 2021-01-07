import React, { Component } from "react";
import {Button, Card} from 'react-bootstrap'

class Landing extends Component{
    state = {
        
    }
   

    render() {
        return(
            <Card style={{ width: 'auto' }}>              
                <Card.Body>
                    <Card.Text>
                        Welcome Katzi! Choose your next step
                    </Card.Text>
                    <Button variant="primary">
                        Upload new data
                    </Button>
                    <Button variant="primary">
                        Visualize your data
                    </Button>
                </Card.Body>
                
            </Card>
        )
    }
}

export default Landing;