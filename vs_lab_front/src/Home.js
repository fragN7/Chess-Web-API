import React,{Component} from 'react';

export class Home extends Component{

    render(){
        return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '65vh' }}>
                <h1 className="justify-content-center">Hello gunners, COYG</h1>
                <p className="justify-content-center">This is my SDI chess project in my 4th semester.I wish you all Ramadan Kareem.</p>
            </div>
        )
    }
}