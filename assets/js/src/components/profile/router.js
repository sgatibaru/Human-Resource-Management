
HRMRegisterModule('profile', 'profile');

import './work-experience/router';
import './education/router';

let personalInformation = resolve => {

    require.ensure(['./personal-information.vue'], () => {
        resolve(require('./personal-information.vue'));
    });
}

let jobLocation = resolve => {

    require.ensure(['./job-location.vue'], () => {
        resolve(require('./job-location.vue'));
    });
}

let skill = resolve => {

    require.ensure(['./skill.vue'], () => {
        resolve(require('./skill.vue'));
    });
}

HRMRegisterChildrenRoute ('hrm_root', 
    [
    	{
            path: 'personal-information', 
        	component: personalInformation, 
        	name: 'personal_information',
        },

        {
            path: 'job-location', 
            component: jobLocation, 
            name: 'job_location',
        },

        {
            path: 'skill', 
            component: skill, 
            name: 'skill',
        }
    ]
);
