
function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null
    // shuffle array of answers
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const handleAnswerCheck = (option) => {
        dispatch({ type: 'newAnswer', payload: option })
    }

    const options = shuffle(question?.options)

    return (
        options.map((option, index) =>
            <button onClick={() => handleAnswerCheck(option)} key={option} className={`btn btn-option
            ${option === answer ? 'answer' : ''}
            ${hasAnswered ? option === question.correctOption ? 'correct' : 'wrong' : ''}
            `
            }
                disabled={hasAnswered}
            >
                {option}
            </button>
        )
    )
}

export default Options