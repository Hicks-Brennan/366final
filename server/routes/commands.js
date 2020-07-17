var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const Command = require('../models/command');

function returnError(res, error) {
  res.status(500).json({
    message: 'An error occurred',
    error: error
  });
}

router.get('/', (req, res, next) => {
  Command.find()
    .then(commands => {
      res.status(200).json({
        message: 'Commands fetched successfully',
        commands: commands
      });
    })
    .catch(error => {
      returnError(res, error);
    });
  }
);

router.post('/', (req, res, next) => {
  const maxCommandId = sequenceGenerator.nextId("commands");

  const command = new Command({
    id: maxCommandId,
    name: req.body.name,
    description: req.body.description,
    // difficulty: req.body.difficulty
  });

  command.save()
    .then(createdCommand => {
      res.status(201).json({
        message: 'Command added successfully',
        command: createdCommand
      });
    })
    .catch(error => {
      returnError(res, error);
    });
});

router.put('/:id', (req, res, next) => {
  Command.findOne({ id: req.params.id })
    .then(command => {
      command.name = req.body.name;
      command.description = req.body.description;
      // command.difficulty = req.body.difficulty;

      Command.updateOne({ id: req.params.id }, command)
        .then(result => {
          res.status(204).json({
            message: 'Command updated successfully'
          })
        })
        .catch(error => {
          returnError(res, error);
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Command not found.',
        error: { command: 'Comamnd not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Command.findOne({ id: req.params.id })
    .then(command => {
      Command.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({ message: "Command deleted successfully" });
        })
        .catch(error => {
          returnError(res, error);
        })
    })
    .catch(error => {
      returnError(res, error);
    });
});

module.exports = router;