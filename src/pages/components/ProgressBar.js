import React from 'react';
import cosine from 'cosine';
import {ProgressBar as Pg} from 'react-bootstrap';


function ProgressBar({userdata,intern,setProg}){

    const matching = () => {
        const internSkills = intern.skills.map(item => item.skill.title);
        const userSkills = userdata.skills.map(item => item.skill.title);
        return cosine(internSkills,userSkills)*100;
    }

    setProg(matching());

    return(
        <div className="progress-wrapper w-100 mx-auto">
            <div className="progress-info">
                <div className="progress-percentage">
                    <span className="text-xs font-weight-bold">Matchs {matching().toFixed(2)}% of my skills</span>
                </div>
            </div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: `${matching().toFixed(2)}%`}} aria-valuenow={matching().toFixed(2)} aria-valuemin={0} aria-valuemax={100}></div>
            </div>
        </div>
    )
}

export default ProgressBar;