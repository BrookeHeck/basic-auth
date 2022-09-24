'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async read(id) {
    try {
      return id ? this.model.findOne( { where: { id: id } }) : this.model.findAll();
    } catch(e) { console.log(e); }
  }

  async create(obj) {
    if(!obj) throw new Error('No json object provided to create method');
    try {
      return this.model.create(obj);
    } catch(e) { console.log(e); }
  }

  async update(obj, id) {
    if(!id || !obj) throw new Error('No JSON object or id provided to the update method');
    try {
      await this.model.update(obj, { where: { id: id } });
      return this.model.findOne({where: { id: id } });
    } catch(e) {console.log(e);}
  }

  async delete(id) {
    if(!id) throw new Error('No id provided to the delete method');
    try {
      let record = await this.model.findOne( {Where: { id: id } });
      await this.model.destroy({ where: { id: id} });
      return record;
    } catch(e) {console.log(e);}
  }
}

module.exports = Collection;