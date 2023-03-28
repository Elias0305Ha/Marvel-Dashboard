// this is a functional component that will be used to display the cards on the page

// props is an object that contains the properties of the component such as title and name
const Card = (props) => {
    return (
    <div className="card">
          <h2>{props.title}</h2>
          <h3>{props.name}</h3>
    </div>
);
}

export default Card;