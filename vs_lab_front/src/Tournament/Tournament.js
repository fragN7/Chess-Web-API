import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { AddTournamentModal } from './AddTournamentModal';
import { UpdateTournamentModal } from './UpdateTournamentModal';
import { DetailsTournamentModal } from './DetailsTournamentModal';
import { DescriptionTournamentModal } from './DescriptionTournamentModal';
import {createBrowserHistory} from "history";

export class Tournament extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            tournaments: [], currentPage: 1, itemsPerPage: this.props.rows ? this.props.rows : 5, totalPages: 0, user: this.props.username,
            addModalShow: false, updateModalShow: false, detailsModalShow: false, descriptionModalShow: false
        };
    }

    async refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chesstournaments?page=${currentPage}&limit=${itemsPerPage}`;
      
        try {
          const response = await fetch(url);
          const data = await response.json();
          const updatedTournaments = [];
          this.setState({ totalPages: data.totalPages });
      
          for (let i = 0; i < data.data.length; i++) {
            const tournamentUrl = `${process.env.REACT_APP_API}chesstournaments/${data.data[i].id}`;
            const tournamentResponse = await fetch(tournamentUrl);
            const tournamentData = await tournamentResponse.json();
      
            updatedTournaments.push({
              ...data.data[i],
              ...tournamentData
            });
          }
      
          this.setState({ tournaments: updatedTournaments });
        } catch (error) {
          console.error(error);
        }
      }

    componentDidMount() {
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
          this.refreshList();
        }
      }

    deleteTournament(trid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'chesstournaments/'+trid, {
                method: 'DELETE',
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

    handlePrevPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
            this.refreshList();
        }
      };
      
      handleNextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
        this.refreshList();
      };
      
      handlePageChange = (pageNumber) => {
          this.setState({ currentPage: pageNumber });
          this.refreshList();
      };

      render() {
        const { tournaments, trid, trname, trnumparticipants, trhost, trprizemoney, trtrophy, trparticipations, trdescription, currentPage, totalPages } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let updateModalClose = () => this.setState({ updateModalShow: false });
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
                            <th className="d-none d-sm-table-cell">
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Participants
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell">
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Host
                                </Button>
                            </th>
                            <th className="d-none d-md-table-cell">
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Prize Money
                                </Button>
                            </th>
                            <th className="d-none d-lg-table-cell">
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Trophy
                                </Button>
                            </th>
                            <th className="d-none d-lg-table-cell">
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Participations
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
                        {tournaments.map(tournament =>
                            <tr key={tournament.id}>
                                <td>{tournament.name}</td>
                                <td className="d-none d-sm-table-cell">{tournament.numParticipants}</td>
                                <td className="d-none d-md-table-cell">{tournament.host}</td>
                                <td className="d-none d-md-table-cell">{tournament.prizeMoney}</td>
                                <td className="d-none d-lg-table-cell">{tournament.trophy}</td>
                                <td className="d-none d-lg-table-cell">{tournament.tournamentParticipations.length}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            onClick={() => this.handleUserNameClick(tournament.tblUser.id)}
                                            variant="link"
                                        >
                                            {tournament.tblUser.userName}
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                                <td>
                                <ButtonToolbar>
                                    
                                <Button className="mr-1" size="sm" onClick={() => this.setState({
                                        descriptionModalShow: true,
                                        trdescription: tournament.description
                                })}>
                                    <i className="bi bi-info-circle"></i>
                                </Button>

                                <DescriptionTournamentModal show={this.state.descriptionModalShow}
                                    onHide={descriptionModalClose}
                                    trdescription = {trdescription}
                                />
                                    
                                        
                                    <Button className="mr-1" variant="info" size="sm"
                                        onClick={() => 
                                            this.setState({
                                                detailsModalShow: true,
                                                trparticipations: tournament.tournamentParticipations })}>
                                        <i className="bi bi-info-circle"></i>
                                    </Button>
                                        
                                    <DetailsTournamentModal show={this.state.detailsModalShow}
                                        onHide={detailsModalClose}
                                        trparticipations={trparticipations}
                                    />

                                    {((this.state.user && this.state.user === tournament.tblUser.userName) || this.state.user === "mod" || this.state.user === "admin") &&
                                    <Button className="mr-1" variant="warning" size="sm"
                                    onClick={()=>this.setState({
                                    updateModalShow:true,
                                    trid: tournament.id,
                                    trname: tournament.name,
                                    trnumparticipants: tournament.numParticipants,
                                    trhost: tournament.host,
                                    trprizemoney: tournament.prizeMoney,
                                    trtrophy: tournament.trophy,
                                    trdescription: tournament.description})}>
                                        <i className="bi bi-pencil"></i>
                                    </Button>
                                    }

                                    {((this.state.user && this.state.user === tournament.tblUser.userName) || this.state.user === "mod" || this.state.user === "admin") &&
                                    <Button className="mr-1" variant="danger" size="sm"
                                    onClick={()=>this.deleteTournament(tournament.id)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                    }

                                    <UpdateTournamentModal show={this.state.updateModalShow}
                                    onHide={updateModalClose}
                                    trid={trid}
                                    trname={trname}
                                    trnumparticipants={trnumparticipants}
                                    trhost={trhost}
                                    trprizemoney={trprizemoney}
                                    trtrophy={trtrophy}
                                    trdescription = {trdescription}
                                    />
                                </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    {this.state.user &&
                    <Button variant = 'primary'
                    onClick = {() => this.setState({addModalShow:true})}>
                        +
                    </Button>
                    }

                    <AddTournamentModal show={this.state.addModalShow}
                        onHide={addModalClose}>
                    </AddTournamentModal>
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