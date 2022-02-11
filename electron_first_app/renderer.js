document.addEventListener("DOMContentLoaded", () => {
    //submit 때의 동작
    document.getElementById("comment-form").onsubmit = () => {
        //코멘트 입력(input 요소) 추출하기
        const commentInput = document.getElementById("comment-input");

        if (commentInput.value === "") {
            alert('코멘트 입력하셈 ^^');
            return false;
        }

        // 입력되면 li만들기
        const newComment = document.createElement("li");

        // li DOM에 넣기
        newComment.innerText = commentInput.value;
        document.getElementById("comments").appendChild(newComment);

        // 코멘트를 입력한 input 내용 지우기
        commentInput.value = "";
        
        return false;
    };
});