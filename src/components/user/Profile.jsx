import React from 'react'
import {
    Link
} from 'react-router-dom'

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="columns">
                <div className="container profile">
                    <div className="modal" id="edit-preferences-modal">
                        <div className="modal-background" />
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Edit Preferences</p>
                                <button className="delete" />
                            </header>
                            <section className="modal-card-body">
                                <label className="label">Name</label>
                                <p className="control">
                                    <input className="input" placeholder="Text input" type="text" />
                                </p>
                                <label className="label">Username</label>
                                <p className="control has-icon has-icon-right">
                                    <input className="input" placeholder="Text input" defaultValue="pmillerk" type="text" />
                                </p>
                                <label className="label">Email</label>
                                <p className="control has-icon has-icon-right">
                                    <input className="input" placeholder="Email input" defaultValue="hello@" type="text" />
                                    <i className="fa fa-warning" />
                                    <span className="help is-danger">This email is invalid</span>
                                </p>
                                <div className="control">
                                    <div className="control-label is-pulled-left">
                                        <label className="label">Date of Birth</label>
                                    </div>
                                    <span>
                                        <span className="select">
                                            <select>
                                                <option>Month</option>
                                                <option>With options</option>
                                            </select>
                                        </span>
                                        <span className="select">
                                            <select>
                                                <option>Day</option>
                                                <option>With options</option>
                                            </select>
                                        </span>
                                        <span className="select">
                                            <select>
                                                <option>Year</option>
                                                <option>With options</option>
                                            </select>
                                        </span>
                                    </span>
                                </div>
                                <label className="label">Description</label>
                                <p className="control">
                                    <textarea className="textarea" placeholder="Describe Yourself!" defaultValue={""} />
                                </p>
                                <div className="content">
                                    <h1>Optional Information</h1>
                                </div>
                                <label className="label">Phone Number</label>
                                <p className="control has-icon has-icon-right">
                                    <input className="input" placeholder="Text input" defaultValue="+1 *** *** 0535" type="text" />
                                </p>
                                <label className="label">Work</label>
                                <p className="control has-icon has-icon-right">
                                    <input className="input" placeholder="Text input" defaultValue="Greater Washington Publishing" type="text" />
                                </p>
                                <label className="label">School</label>
                                <p className="control has-icon has-icon-right">
                                    <input className="input" placeholder="Text input" defaultValue="George Mason University" type="text" />
                                </p>
                            </section>
                            <footer className="modal-card-foot">
                                <a className="button is-primary modal-save">Save changes</a>
                                <a className="button modal-cancel">Cancel</a>
                            </footer>
                        </div>
                    </div>
                    <div className="section profile-heading">
                        <div className="columns is-mobile is-multiline">
                            <div className="column is-2">
                                <span className="header-icon user-profile-image">
                                    <img alt src="http://placehold.it/300x225" />
                                </span>
                            </div>
                            <div className="column is-4-tablet is-10-mobile name">
                                <p>
                                    <span className="title is-bold">Paul Miller</span>
                                    <br />
                                    <a className="button is-primary is-outlined" href="#" id="edit-preferences" style={{ margin: '5px 0' }}>
                                        Edit Preferences
            </a>
                                    <br />
                                </p>
                                <p className="tagline">
                                    The users profile bio would go here, of course. It could be two lines or more or whatever. We should probably limit the amount of characters to ~500 at most though.
          </p>
                            </div>
                            <div className="column is-2-tablet is-4-mobile has-text-centered">
                                <p className="stat-val">30</p>
                                <p className="stat-key">searches</p>
                            </div>
                            <div className="column is-2-tablet is-4-mobile has-text-centered">
                                <p className="stat-val">10</p>
                                <p className="stat-key">likes</p>
                            </div>
                            <div className="column is-2-tablet is-4-mobile has-text-centered">
                                <p className="stat-val">3</p>
                                <p className="stat-key">lists</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-options is-fullwidth">
                        <div className="tabs is-fullwidth is-medium">
                            <ul>
                                <li className="link">
                                    <a>
                                        <span className="icon">
                                            <i className="fa fa-list" />
                                        </span>
                                        <span>My Lists</span>
                                    </a>
                                </li>
                                <li className="link is-active">
                                    <a>
                                        <span className="icon">
                                            <i className="fa fa-thumbs-up" />
                                        </span>
                                        <span>My Likes</span>
                                    </a>
                                </li>
                                <li className="link">
                                    <a>
                                        <span className="icon">
                                            <i className="fa fa-search" />
                                        </span>
                                        <span>My Searches</span>
                                    </a>
                                </li>
                                <li className="link">
                                    <a>
                                        <span className="icon">
                                            <i className="fa fa-balance-scale" />
                                        </span>
                                        <span>Compare</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="box" style={{ borderRadius: 0 }}>
                        {/* Main container */}
                        <div className="columns">
                            <div className="column is-2-tablet user-property-count has-text-centered">
                                <p className="subtitle is-5">
                                    <strong />
                                    123
            <br />
                                    properties
          </p>
                            </div>
                            <div className="column is-8">
                                <p className="control has-addons">
                                    <input className="input" placeholder="Search your liked properties" style={{ width: '100% !important' }} type="text" />
                                    <button className="button">
                                        Search
            </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column is-3-tablet is-6-mobile">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#1</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3-tablet is-6-mobile">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#2</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#3</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#4</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#5</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#6</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#7</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                        <div className="column is-3">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img alt src="http://placehold.it/300x225" />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <span className="tag is-dark subtitle">#8</span>
                                        <p>Personal Notes on the Property (can be edited and saved automatically by clicking in and clicking out of text area) - these are unique to the user - they will show up as part of a saved listings' info here - but adding notes to a property does not automatically create a saved listing. Likewise, removing this proeprty from saved listings does not auto remove the notes.</p>
                                    </div>
                                </div>
                                <footer className="card-footer">
                                    <a className="card-footer-item">Compare</a>
                                    <a className="card-footer-item">Share</a>
                                    <a className="card-footer-item">Delete</a>
                                </footer>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;