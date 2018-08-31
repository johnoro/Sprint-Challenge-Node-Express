const router = require('express').Router();
const db = require('../data/helpers/projectModel');

const getProjects = (req, res) => {
  db.get()
    .then(projects => res.status(200).json(projects))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting projects.' });
    });
};

router.get('/', getProjects);

router.get('/:id', (req, res) => {
  db.get(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting project.' });
    });
});

router.get('/:id/actions', (req, res) => {
  db.getProjectActions(req.params.id)
    .then(actions => res.status(200).json(actions))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error getting the actions for that project.' });
    });
});

router.post('/', (req, res) => {
  db.insert(req.body)
    .then(() => getProjects(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error adding the project.' });
    });
});

router.put('/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(() => getProjects(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error updating that project.' });
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(() => getProjects(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error deleting that project.' });
    });
});

module.exports = router;
