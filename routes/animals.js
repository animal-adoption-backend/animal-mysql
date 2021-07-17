const express = require("express");
const Animals = require('../models/animal');
const app = express();
// const Users = require('../models/user');
// const Comments = require('../models/comment');
// const { Op } = require('sequelize');
const router = express.Router();


//동물 등록하기
router.post("/animals", async (req, res) => {
  try {
    const { userId, animalId, title, animalName, animalSpecies, animalBreed, animalAge, animalGender, animalStory, animalPhoto } = req.body;
    await Animals.create({ userId, animalId, title, animalName, animalSpecies, animalBreed, animalAge, animalGender, animalStory, animalPhoto });
    res.status(200).send({
      "ok": true,
      message: '동물 등록 성공',
    });
  } catch (error) {
    console.error('동물 등록 에러',error);
    res.status(400).send({
      "ok": false,
      message: '동물 등록 실패',
    })
  }
});

//모든 동물 리스트 보여주기
router.get("/animals", async (req, res) => {
  try {
    const animals = await Animals.findAll()
    res.status(200).send({
      'ok': true,
      result: animals,
    })
  } catch (err) {
    console.error(err);
    res.status(400).send({
      'ok': false,
      message: '동물 리스트 불러오기 실패',
    })
  }
});

//동물 상세정보 불러오기
router.get("/animals/:animalId", async (req, res) => {
  try {
    const { animalId } = req.params;
    animal = await Animals.findOne({ 
      where: {
        animalId
      }
     });
    res.status(200).send({
      'ok': true,
      result: animal,
    })
  } catch (err) {
    console.error(err);
    res.status(400).send({
      'ok': false,
      message: '동물 상세정보 불러오기 실패',
    })
  }
});

//동물 정보 수정하기
router.put("/animals/:animalId", async (req, res) => {
  try {
    const { animalId } = req.params;
    const { userId, title, animalName, animalSpecies, animalBreed, animalAge, animalGender, animalStory, animalPhoto } = req.body;
    const target = await Animals.findOne({ 'animalId': animalId, 'userId': userId });

    if (!target) {
      res.status(400).send({
        'ok': false,
        message: '이 동물의 주인이 아닙니다',
      });
      return;
    }
    await target.updateOne(
      {
        $set: {
          'title': title, 'animalName': animalName, 'animalSpecies': animalSpecies,
          'animalBreed': animalBreed, 'animalAge': animalAge, 'animalGender': animalGender,
          'animalStory': animalStory, 'animalPhoto': animalPhoto
        }
      });

    res.status(200).send({
      'ok': true,
      message: '동물 수정 성공',
    })
  } catch (err) {
    console.error('동물 수정 에러 메세지: ', err);
    res.status(400).send({
      'ok': false,
      message: '동물 수정 실패',
    })
  }
});




router.post("/delete", async (req, res, next) => {
  try {
    const { contentId, password } = req.body;
    await Posts.deleteOne({ 'contentId': contentId, 'password': password });
    res.send({ result: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }



});


module.exports = router;