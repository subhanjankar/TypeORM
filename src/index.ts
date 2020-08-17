import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {User} from "./entity/User";
import {Profile} from "./entity/Profile";
import {CUser} from "./entity/CUser";
import {Category} from './entity/Category';
import {Question} from './entity/Question';

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    user.address="kolkata";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    const profile = new Profile();
    profile.gender = "male";
    profile.photo = "me.jpg";
    await connection.manager.save(profile);
    
    const cUser = new CUser();
    cUser.name = 'Joe Smith';
    cUser.profile = profile;
    await connection.manager.save(cUser);

    const firstUser = await connection
    .getRepository(CUser)
    .createQueryBuilder("user")
    .where("user.id = :id", { id: 1 })
    .getOne();

    console.log(firstUser);
    connection.createQueryBuilder

    /** CRUD OPERATION */
    // Insert
    const profe = new Profile();
    profe.gender="male";
    profe.photo="mk";
    
    await connection
    .createQueryBuilder()
    .insert()
    .into(Profile)
    .values(profe)
    .execute();
    await connection
    .createQueryBuilder()
    .insert()
    .into(CUser)
    .values([
        { name: "subhanjan", profile: profe},
     ])
    .execute();
    /** CRUD OPERATION */
    // Update

    await connection
    .createQueryBuilder()
    .update(CUser)
    .set({ profile: null })
    .where("name = :name", { name: "subhanjan" })
    .execute();
    /** CRUD OPERATION */
    // Delete
    await connection
    .createQueryBuilder()
    .delete()
    .from(CUser)
    .where("name = :name", { name: "subhanjan" })
    .execute();

    await mapping(connection);

    console.log("Here you can setup and run express/koa/any other framework.");
    connection.close();
}).catch(error => {
    console.log(error);
    
});
async function mapping(connection:Connection){
try{

    const category1 = new Category();
    category1.name = "animals";
    
    const category2 = new Category();
    category2.name = "zoo";
    
    const question = new Question();
    question.title = "First testing";
    question.text = " testing";
    question.categories = [category1, category2];
    await connection.manager.save(question);
}
catch(error){
console.log("failed in mapping");
}
    
}