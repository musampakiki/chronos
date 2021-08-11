import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// components
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
// import HomeDark from "./pages/HomeDark";
import Home from "./pages/Home";
// import SearchResults from "./pages/SearchResults";
import Colors from "./components/Colors";
import AddColor from "./components/AddColor";
import EditColor from "./components/EditColor";
import RemoveColor from "./components/RemoveColor";
import ColorId from "./components/ColorId"



import Lists from "./components/Lists";
import AddList from "./components/AddList";
import EditList from "./components/EditList";
import RemoveList from "./components/RemoveList";
import ListId from "./components/ListId"



import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import RemoveTask from "./components/RemoveTask";
import TaskId from "./components/TaskId"




const AppRouter = () => (


        <Router>
            <ScrollToTop/>
            <Navbar/>
            <Sidebar/>
            <BottomBar/>
            <Container>
                <Switch>

                    {/*<Route path="/results/:searchterm" component={SearchResults} />*/}
                    <Route exact path="/colors" component={Colors}/>
                    <Route exact path="/colors/add-color" component={AddColor}/>
                    <Route exact path="/colors/:colorId" component={ColorId}/>
                    <Route path="/colors/:colorId/edit" component={EditColor}/>
                    <Route exact path="/colors/:colorId/remove" component={RemoveColor}/>

                    <Route exact path="/lists" component={Lists}/>
                    <Route exact path="/lists/add-list" component={AddList}/>
                    <Route exact path="/lists/:listId" component={ListId}/>
                    <Route path="/lists/:listId/edit" component={EditList}/>
                    <Route exact path="/lists/:listId/remove" component={RemoveList}/>


                    <Route exact path="/tasks" component={Tasks}/>
                    <Route exact path="/tasks/add-task" component={AddTask}/>
                    <Route exact path="/tasks/:taskId" component={TaskId}/>
                    <Route path="/tasks/:taskId/edit" component={EditTask}/>
                    <Route exact path="/tasks/:taskId/remove" component={RemoveTask}/>


                    <Route path="/" component={Home}/>
                    <Redirect to="/"/>
                </Switch>
            </Container>
        </Router>
    );

export default AppRouter;
