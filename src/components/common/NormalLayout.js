var React = require('react');
var { Link } = require('react-router');
var {
  Navbar,
  NavBrand,
  Nav,
  NavItem,
  Image,
  ListGroup
} = require('react-bootstrap');

class NormalLayout extends React.Component {
  render () {
    return (
     <div className="rss-container">
        <div id="content">
          <div className="rss-top">
            <img src="/images/top-window.png" className="image-responsive"/>
          </div>
          <div className="rss-middle">
            <div className="rss-left"></div>
            <div className="rss-center">
              <div className="header">
                <h1>{this.props.title}</h1>
              </div>          
              <div className="elements">
                {this.props.content}
              </div>
              <div className="footer">
                <Link to={this.props.toRoute} className="pull-left">{this.props.message}</Link>
              </div>
            </div>
            <div className="rss-right"></div>  
          </div> 
          <div className="rss-bottom">
            <img src="/images/bottom-window.png" className="image-responsive"/>
          </div>           
        </div>
      </div>
    );
  }
};

module.exports = NormalLayout;