import React from 'react';
import StarRatings from 'react-star-ratings'

function Comment(props) {
    const { name, content, rating, title } = props.comment;
    return (

        <div className="media mb-3 mr-5 border-dark border-bottom">
            <div >
                <img
                    className="rounded mx-3 "
                    width="64"
                    height="64"
                    src={`https://robohash.org/${name}?size=48x48`}
                    alt={name}
                />
                <h6 className="text-muted mx-auto">{name}</h6>
            </div>
            
            <div className="media-body " style={{ width: "600px" }}>
                <div className= "comment-content">
                    <h5 className="mt-0 mb-0 mr-3">{title}</h5>
                    <StarRatings rating={rating ? rating : 0} starRatedColor="rgb(255, 187, 0)" starEmptyColor="rgb(230, 247, 241)" numberOfStars={5} starDimension='1.2rem' starSpacing="0.5px" />
                    <p className="mt-3 text-mutted mb-3">{content}</p>
                </div>
            </div>
        </div>
        
    )
}

export default Comment