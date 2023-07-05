import TextExpander from './component/TextExpander'
import './App.css';

const styles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '30px'
}
function App() {
  return (
    <div style={styles}>

      <TextExpander expandButton="Show Text" buttonColor='#ff6622' color='#fff' wordLimit={300} buttonInline={true} collapseButtonText='Hide Text'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto eaque dicta impedit fugiat ullam quas! Eligendi corporis sapiente nulla dolorem. Velit nostrum iure reprehenderit sunt laboriosam, aperiam similique! Velit facere esse, maiores dolorem ipsa at, ab repellat reiciendis itaque, minus temporibus obcaecati optio distinctio. Optio libero assumenda alias eum. Dignissimos assumenda nihil magni dolorem suscipit consectetur quidem a aspernatur culpa quos molestiae iure distinctio ab provident deserunt harum aliquid odio asperiores voluptatibus, magnam, architecto eum alias. Omnis impedit facere quisquam similique consequuntur dolores unde provident, ut earum ipsa in, perferendis suscipit delectus. Saepe harum vel deleniti quisquam odio quam laudantium?
      </TextExpander>

      <TextExpander expandButton="Show More" buttonColor='#f31428' color='#fff' wordLimit={100} buttonInline={false} collapseButtonText='Hide Text'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto eaque dicta impedit fugiat ullam quas! Eligendi corporis sapiente nulla dolorem. Velit nostrum iure reprehenderit sunt laboriosam, aperiam similique! Velit facere esse, maiores dolorem ipsa at, ab repellat reiciendis itaque, minus temporibus obcaecati optio distinctio. Optio libero assumenda alias eum. Dignissimos assumenda nihil magni dolorem suscipit consectetur quidem a aspernatur culpa quos molestiae iure distinctio ab provident deserunt harum aliquid odio asperiores voluptatibus, magnam, architecto eum alias. Omnis impedit facere quisquam similique consequuntur dolores unde provident, ut earum ipsa in, perferendis suscipit delectus. Saepe harum vel deleniti quisquam odio quam laudantium?
      </TextExpander>

      <TextExpander boxClass='box'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto eaque dicta impedit fugiat ullam quas! Eligendi corporis sapiente nulla dolorem. Velit nostrum iure reprehenderit sunt laboriosam, aperiam similique! Velit facere esse, maiores dolorem ipsa at, ab repellat reiciendis itaque, minus temporibus obcaecati optio distinctio. Optio libero assumenda alias eum. Dignissimos assumenda nihil magni dolorem suscipit consectetur quidem a aspernatur culpa quos molestiae iure distinctio ab provident deserunt harum aliquid odio asperiores voluptatibus, magnam, architecto eum alias. Omnis impedit facere quisquam similique consequuntur dolores unde provident, ut earum ipsa in, perferendis suscipit delectus. Saepe harum vel deleniti quisquam odio quam laudantium?
      </TextExpander>


    </div>
  )

}


export default App;
