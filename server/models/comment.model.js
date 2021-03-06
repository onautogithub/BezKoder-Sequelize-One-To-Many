module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    name: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  }
  )
  Comment.associate = (models) => {
    Comment.belongsTo(models.Tutorial, {
      onDelete: 'CASCADE',
      foreignKey: 'tutorialId'
    })
  }
  return Comment
}
