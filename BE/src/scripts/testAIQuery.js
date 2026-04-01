import axios from 'axios';

async function testRecommend() {
    try {
        console.log("Calling recommend-jobs for cv_12...");
        const res = await axios.post('http://localhost:8001/api/v1/cv/recommend-jobs', {
            cv_id: 'cv_12',
            n_results: 5
        });
        console.log("Result from AI Service:");
        console.log(JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error("AI Service Error:", err.response?.data || err.message);
    }
}

testRecommend();
