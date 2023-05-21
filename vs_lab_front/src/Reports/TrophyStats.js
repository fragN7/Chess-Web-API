import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Component } from 'react';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

export class TrophyStats extends Component{

    constructor(props){
        super(props);
        this.state={ champs:[], currentPage: 1, itemsPerPage: 5, totalPages: 0 };
    }
  
    componentDidMount(){
      this.refreshList();
    } 

    refreshList() {
        const { currentPage, itemsPerPage } = this.state;
        const url = `${process.env.REACT_APP_API}chessplayers/trophies?page=${currentPage}&limit=${itemsPerPage}`;
        
        fetch(url)
          .then(response => response.json())
          .then(data => {
              this.setState({ champs: data.data, totalPages: data.totalPages })
          });
    }

      
    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber }, this.refreshList);
    };

    render() {
        const { champs, currentPage, totalPages } = this.state;

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

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Name
                                </Button>
                            </th>
                            <th>
                                <Button variant="outline-primary" className="font-weight-bold" style={{ backgroundColor: 'transparent', borderColor: 'transparent', color: 'black', textShadow: 'none' }}>
                                    Trophies
                                </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {champs.map(trophy =>
                            <tr>
                                <td>{trophy.name}</td>
                                <td>{trophy.trophies}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
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