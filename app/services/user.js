const create = async (Model, details) => {
  try {
    const data = new Model(details).save();
    return data;
  } catch (err) {
    return false;
  }
};

const updateByCondition = async (Model, condition, content) => {
  try {
    const data = await Model.findOneAndUpdate(condition, { $set: content }, { new: true });
    return data;
  } catch (err) {
    return false;
  }
};

const getByCondition = async (Model, condition, projection = {}) => {
  try {
    const data = await Model.findOne(condition, projection).lean();
    return data || null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAll = async (Model, condition, project) => {
  try {
    const data = await Model.find(condition, project).sort({ createdAt: -1 }).lean();
    return data || null;
  } catch (error) {
    return false;
  }
};

const removeById = async (Model, id) => {
  try {
    const data = await Model.findByIdAndDelete(id);
    return data;
  } catch (error) {
    return false;
  }
};

module.exports = {
  create,
  updateByCondition,
  getByCondition,
  getAll,
  removeById

};
