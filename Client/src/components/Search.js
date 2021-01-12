import React from 'react';
import { Button } from 'react-bootstrap';
import "./SearchBar.css";
function Search() {
    return (
      <div className="container">
	<div className="row">
	    <div className="col-12">
    	    <div id="custom-search-input">
                <div className="input-group">
                    <input type="text" className="search-query form-control" placeholder="Search" />
                    <span className="input-group-btn">
                        <Button type="button">
                            <span className="fa fa-search large"></span>
                        </Button>
                    </span>
                </div>
            </div>
        </div>
	</div>
</div>
    )
}

export default Search;