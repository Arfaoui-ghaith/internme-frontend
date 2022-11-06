import React from 'react';

function Footer() {
    return(
        <React.Fragment>
            <footer className="footer pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-8 mx-auto text-center mt-1">
                            <p className="mb-0 text-secondary">
                                Copyright { new Date().getFullYear() } Soft by InternMe Team.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;