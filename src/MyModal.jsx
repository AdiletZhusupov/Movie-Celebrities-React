import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const MyModal = ({ toggle, celebrityInfo, modal, picUrl }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{celebrityInfo.name}</ModalHeader>
        <ModalBody>
          <div className="celebrity-info-wrapper">
            <p className="celebrity-profile">
              <img
                src={
                  celebrityInfo.profile_path
                    ? `${picUrl}${celebrityInfo.profile_path}`
                    : null
                }
                alt={celebrityInfo.name}
              />
            </p>
            <p>
              Popularity: <span>{celebrityInfo.popularity}</span>
            </p>
            <p>Movies {celebrityInfo.name} played in:</p>
          </div>
          <div className="known-for-movies">
            {celebrityInfo.known_for.map((movieKnowFor, index) => {
              return (
                <div className="each-movie" key={index}>
                  <div className="movie-poster">
                    <img
                      src={
                        movieKnowFor.backdrop_path
                          ? `${picUrl}${movieKnowFor.backdrop_path}`
                          : `${picUrl}${movieKnowFor.poster_path}`
                      }
                      alt={movieKnowFor.name}
                    />
                  </div>
                  <div className="each-movie-title">
                    {movieKnowFor.name ? movieKnowFor.name : movieKnowFor.title}
                  </div>
                </div>
              );
            })}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default MyModal;
