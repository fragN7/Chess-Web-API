import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddPlayerModal } from './AddPlayerModal';
import { UpdatePlayerModal } from './UpdatePlayerModal';
import { DetailsPlayerModal } from './DetailsPlayerModal';
import { DescriptionPlayerModal } from './DescriptionPlayerModal';
import {createBrowserHistory} from "history";
import 'bootstrap-icons/font/bootstrap-icons.css';

export class Player extends Component{

    constructor(props){
        super(props);
        console.log(this.props.username);
        this.state={players:[], currentPage: 1, itemsPerPage: this.props.rows ? this.props.rows : 5, totalPages: 0, user: this.props.username,
            addModalShow: false, updateModalShow: false, descriptionModalShow:false, detailsModalShow: false
        };
    }

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers?page=${currentPage}&limit=${itemsPerPage}`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
              const updatedPlayers = [];
              this.setState({totalPages: data.totalPages })
              const playerPromises = data.data.map(player => {
              // Fetch data for each player using the /chessplayers/{id} endpoint
              const playerUrl = `${process.env.REACT_APP_API}chessplayers/${player.id}`;
              return fetch(playerUrl).then(response => response.json());
            });
      
            Promise.all(playerPromises).then(playerData => {
              // Combine the player data with the original player object
              for (let i = 0; i < data.data.length; i++) {
                updatedPlayers.push({
                  ...data.data[i],
                  ...playerData[i]
                });
              }
              this.setState({ players: updatedPlayers });
            });
          });
    }

    componentDidMount(){
        this.refreshList();
        if (this.state.user === "admin") {
            this.setState({user: 'admin'});
        } else if (/\d/.test(this.state.user)) {
            this.setState({user: 'mod'});
        } else if (this.state.user !== "") {
            this.setState({user: this.state.user});
        } else {
            this.setState({user: ''});
        }
    }

    deletePlayer(plid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'chessplayers/'+plid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                        'Content-Type':'application/json'}
            })
        }
    }

    handleUserNameClick = (userId) => {
        const history = createBrowserHistory();
        history.push('/users/' + userId);
        window.location.reload();
    };

    ratingSort(){
        let playas = this.state.players;
        playas.sort((a,b) => b.rating - a.rating);
        this.setState({players: playas});
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.refreshList);
    };

    render(){
        const {players, plid, plname, plcountry, plrating, plismaster, plstartyear, pldescription, plchampions, plparticipations, currentPage, totalPages} = this.state;
        let addModalClose = () => this.setState({addModalShow:false});
        let updateModalClose = () => this.setState({updateModalShow:false});
        let detailsModalClose = () => this.setState({ detailsModalShow: false });
        let descriptionModalClose = () => this.setState({ descriptionModalShow: false });

        let pageButtons = [];
        if (totalPages <= 10) {
          // less than 10 pages, show all buttons
          for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant={i === currentPage ? "primary" : "outline-primary"}
                onClick={() => this.handlePageChange(i)}
              >
                {i}
              </Button>
            );
          }
        } else {
          // more than 10 pages, show current page, 2 before and 2 after,
          // and first and last page buttons
          if (currentPage <= 3) {
            // show first 5 buttons and "..." button
            for (let i = 1; i <= 5; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            );
          } else if (currentPage >= totalPages - 2) {
            // show last 5 buttons and "..." button
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(1)}
              >
                1
              </Button>
            );
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            for (let i = totalPages - 4; i <= totalPages; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
          } else {
            // show current page, 2 before and 2 after, and first and last page buttons
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(1)}
              >
                1
              </Button>
            );
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
              pageButtons.push(
                <Button
                  style={{ marginLeft: "2px" }}
                  variant={i === currentPage ? "primary" : "outline-primary"}
                  onClick={() => this.handlePageChange(i)}
                >
                  {i}
                </Button>
              );
            }
            pageButtons.push(<Button variant="outline-primary" style={{ marginLeft: '2px', marginRight: '2px' }}>.....</Button>);
            pageButtons.push(
              <Button
                style={{ marginLeft: "2px" }}
                variant="outline-primary"
                onClick={() => this.handlePageChange(totalPages)}
              >
                {totalPages}
              </Button>
            );
          }
        }

        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                Name
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Country
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold"
                                style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}
                                onClick={() => this.ratingSort()}>
                                    Rating ⇩
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    IsMaster
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    StartYear
                                </Button>
                            </th>
                            <th className="d-none d-lg-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Participations
                                </Button>
                            </th>
                            <th className="d-none d-xl-table-cell" style={{ display: 'none!important' }}>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Championships
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Added By
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Options
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => {
                            return (
                                <tr key={player.id}>
                                    <td>{player.name}</td>
                                    <td className="d-none d-md-table-cell" style={{ display: 'none!important' }}>{player.country}</td>
                                    <td className="d-none d-md-table-cell" style={{ display: 'none!important' }}>{player.rating}</td>
                                    <td className="d-none d-md-table-cell" style={{ display: 'none!important' }}>{player.isMaster}</td>
                                    <td className="d-none d-md-table-cell" style={{ display: 'none!important' }}>{player.startYear}</td>
                                    <td className="d-none d-lg-table-cell" style={{ display: 'none!important' }}>{player.playerParticipations.length}</td>
                                    <td className="d-none d-xl-table-cell" style={{ display: 'none!important' }}>{player.chessChampions.length}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button
                                                onClick={() => this.handleUserNameClick(player.tblUser.id)}
                                                variant="link"
                                            >
                                                {player.tblUser.userName}
                                            </Button>
                                        </ButtonToolbar>
                                    </td>
                                    <td>
                                        <ButtonToolbar>

                                            <Button className="mr-1" size="sm" onClick={() => this.setState({
                                                descriptionModalShow: true,
                                                pldescription: player.description
                                            })}>
                                                <i className="bi bi-info-circle"></i>
                                            </Button>

                                            <DescriptionPlayerModal show={this.state.descriptionModalShow}
                                                onHide={descriptionModalClose}
                                                pldescription = {pldescription}
                                            />

                                            <Button className="mr-1" variant="info" size="sm"
                                                onClick={() =>
                                                    this.setState({
                                                        detailsModalShow: true,
                                                        plchampions: player.chessChampions,
                                                        plparticipations: player.playerParticipations})}>
                                                <i className="bi bi-info-circle"></i>
                                            </Button>

                                            <DetailsPlayerModal show={this.state.detailsModalShow}
                                                onHide={detailsModalClose}
                                                plchampions = {plchampions}
                                                plparticipations={plparticipations}
                                            />

                                            {((this.state.user && this.state.user === player.tblUser.userName) || this.state.user === "mod" || this.state.user === "admin") &&
                                            <Button className="mr-1" variant="warning" size="sm"
                                                onClick={() => this.setState({
                                                    updateModalShow: true,
                                                    plid: player.id,
                                                    plname: player.name,
                                                    plcountry: player.country,
                                                    plrating: player.rating,
                                                    plismaster: player.isMaster,
                                                    plstartyear: player.startYear,
                                                    pldescription: player.description
                                                })
                                                }>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            }

                                            <UpdatePlayerModal show={this.state.updateModalShow}
                                                               onHide={updateModalClose}
                                                               plid={plid}
                                                               plname={plname}
                                                               plcountry={plcountry}
                                                               plrating={plrating}
                                                               plismaster={plismaster}
                                                               plstartyear={plstartyear}
                                                               pldescription={pldescription}>
                                            </UpdatePlayerModal>

                                            {((this.state.user && this.state.user === player.tblUser.userName) || this.state.user === "mod" || this.state.user === "admin") &&
                                            <Button className="mr-1" variant="danger" size="sm"
                                                onClick={() => this.deletePlayer(player.id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                            }

                                        </ButtonToolbar>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    {this.state.user &&
                    <Button variant = 'primary' 
                    onClick = {() => this.setState({addModalShow:true})}>
                        +
                    </Button>
                    }

                    <AddPlayerModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddPlayerModal>
                    
                </ButtonToolbar>
                <ButtonToolbar style={{ display: 'flex', justifyContent: 'center' }}>
                        {currentPage !== 1 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(1)}
                            >
                            1
                            </Button>
                        )}
                        {currentPage > 3 && <span style={{ fontSize: '1.5em' }}>...</span>}
                        {currentPage > 2 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(currentPage - 1)}
                            >
                            {currentPage - 1}
                            </Button>
                        )}
                        <Button style={{ marginLeft: '2px', marginRight: '2px' }} disabled>
                            {currentPage}
                        </Button>
                        {currentPage < totalPages - 1 && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(currentPage + 1)}
                            >
                            {currentPage + 1}
                            </Button>
                        )}
                        {currentPage < totalPages - 2 && <span style={{ fontSize: '1.5em' }}>...</span>}
                        {currentPage !== totalPages && (
                            <Button
                            style={{ marginLeft: '2px', marginRight: '2px' }}
                            onClick={() => this.handlePageChange(totalPages)}
                            >
                            {totalPages}
                            </Button>
                        )}
                    </ButtonToolbar>
            </div>
        )
    }
}