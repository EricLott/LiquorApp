import { useParams, useNavigate } from 'react-router-dom';

const BottleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // This would come from your API in a real app
  const bottle = {
    id: id,
    name: 'Johnnie Walker Blue Label',
    type: 'Blended Scotch Whisky',
    abv: '40%',
    origin: 'Scotland',
    description: 'A luxurious blend of rare Scotch whiskies, each aged for a minimum of 21 years.',
    tastingNotes: 'Rich, velvety smooth with a long, lingering finish. Notes of honey, dark chocolate, and dried fruits.'
  };

  return (
    <div className="page-container">
      <div className="bottle-header">
        <button 
          className="btn-icon back-button" 
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          &larr;
        </button>
        <h1>Bottle Details</h1>
      </div>
      
      <div className="bottle-details">
        <div className="bottle-image-large">
          <span role="img" aria-label="whisky bottle">🥃</span>
        </div>
        
        <div className="bottle-info">
          <h2>{bottle.name}</h2>
          <div className="bottle-meta">
            <span className="bottle-type">{bottle.type}</span>
            <span className="bottle-abv">{bottle.abv} ABV</span>
            <span className="bottle-origin">{bottle.origin}</span>
          </div>
          
          <div className="section">
            <h3>Description</h3>
            <p>{bottle.description}</p>
          </div>
          
          <div className="section">
            <h3>Tasting Notes</h3>
            <p>{bottle.tastingNotes}</p>
          </div>
          
          <div className="bottle-actions">
            <button className="btn primary">
              Edit Details
            </button>
            <button className="btn secondary">
              Remove from Collection
            </button>
          </div>
        </div>
      </div>
      
      <div className="section">
        <h3>Suggested Cocktails</h3>
        <div className="suggested-cocktails">
          <div className="cocktail-suggestion">
            <span role="img" aria-label="cocktail">🍹</span>
            <span>Old Fashioned</span>
          </div>
          <div className="cocktail-suggestion">
            <span role="img" aria-label="cocktail">🥃</span>
            <span>Whisky Sour</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottleDetails;
