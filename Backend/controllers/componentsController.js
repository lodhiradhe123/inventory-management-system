const express = require('express');
const router = express.Router();
const Component = require('../models/componentSchema');

exports.createComponent = async (req, res) => {
    const { s_no, name, part_number, date_received, number_received, date_dispatch, number_dispatched, balance_items, qr_identifier } = req.body;
    try {
        // res.send(req.body);
        const newComponent = new Component({ s_no, name, part_number, date_received, number_received, date_dispatch, number_dispatched, balance_items, qr_identifier });
        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getAllComponents = async (req, res) => {
    try {
        const components = await Component.find();
        res.status(200).json(components);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getSingleComponent=async (req, res) => {
    try {
        const component = await Component.findOne({ _id: req.params.id });
        if (component) {
            res.status(200).json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.componentQrIdentifire=async (req, res) => {
    try {
        const component = await Component.findOne({ qr_identifier: req.params.qr_identifier });
        if (component) {
            res.status(200).json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateComponent= async (req, res) => {
    const { s_no, name, part_number, date_received, number_received, date_dispatch, number_dispatched, balance_items } = req.body;
    try {
        // const component = await Component.findOne({qr_identifier:req.params.qr_identifier})

        const component = await Component.findOneAndUpdate(
            { _id: req.params.id },
            { s_no, name, part_number, date_received, number_received, date_dispatch, number_dispatched, balance_items },
            { new: true }
        );
        if (component) {
            res.status(200).json(component);
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteComponent=async (req, res) => {
    try {
        const component = await Component.findOneAndDelete({ _id: req.params.id });
        if (component) {
            res.status(200).json({ message: 'Component deleted', component });
        } else {
            res.status(404).json({ message: 'Component not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}