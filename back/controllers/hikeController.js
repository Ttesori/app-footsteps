const getHikes = (req, res) => {
  res.json({
    message: 'Some hikes'
  })
}

const createHike = (req, res) => {
  res.json({
    message: 'Create hike'
  })
}

const updateHike = (req, res) => {
  res.json({
    message: `Update hike ${req.params.id}`
  })
}

const deleteHike = (req, res) => {
  res.json({
    message: `Delete hike ${req.params.id}`
  })
}

module.exports = { getHikes, createHike, updateHike, deleteHike }