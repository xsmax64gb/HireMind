import JobModel from './src/models/jobModel.js';

async function test() {
    try {
        console.log('Testing JobModel.findAll...');
        const result = await JobModel.findAll({ limit: 10, offset: 0 });
        console.log('Success:', result.jobs.length, 'jobs found');
    } catch (error) {
        console.error('FAILED JobModel.findAll:', error);
    }

    try {
        console.log('Testing JobModel.findByRecruiterId...');
        // Let's try a sample ID or one from the DB
        const result = await JobModel.findByRecruiterId('some-random-id');
        console.log('Success:', result.length, 'jobs found');
    } catch (error) {
        console.error('FAILED JobModel.findByRecruiterId:', error);
    }
}

test();
