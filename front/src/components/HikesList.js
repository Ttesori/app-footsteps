const HikesList = (hikes) => {
  return hikes && (
    <section>
      <h2>My Hikes</h2>
      {hikes.length > 0 ?
        hikes.map(hike => <p>{hike.title}</p>) :
        <p>No hikes available.</p>}
    </section>
  );
};
export default HikesList;