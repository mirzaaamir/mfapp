import React,{ Component } from 'react';
import { connect } from 'react-redux';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import {  setSearchFeild , requestRobots } from './actions';

import ErrorBoundary from './ErrorBoundary';

               const mapStateToProps = state => {
					return {
						searchField: state.searchRobots.searchField,
						robots:     state.requestRobots.robots,
						isPending:  state.requestRobots.isPending,
						error:    state.requestRobots.error 
					}
                }
              const mapDispatchToProps = (dispatch) =>{
								return{
									onSearchChange: (event)=> dispatch(setSearchFeild(event.target.value)),
									onRequestRobots : () => dispatch(requestRobots())
								}
				}

       class App extends Component {
	
					componentDidMount(){
						this.props.onRequestRobots();
					}

		 render() {
				 	const { searchField, onSearchChange, robots, isPending} = this.props ;
				 	const filteredRobots = robots.filter(robots =>{
				      return robots.name.toLowerCase().includes(searchField.toLowerCase());
				    })
	
		    	  return isPending ?
		    	    <h1> Loading </h1> :
		             (
					   <div className='tc'>
					   <h1> RoboFriends </h1>
					   <SearchBox searchChange={onSearchChange} />
					   <Scroll>
					   <ErrorBoundary>
					   <CardList robots={filteredRobots}/>
					   </ErrorBoundary>
					   </Scroll>
					   </div>
		            );
	 
		        }
	   }

	

export default connect(mapStateToProps,mapDispatchToProps)(App);