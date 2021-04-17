/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback} from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import Datepicker from "react-datepicker";
import es from "date-fns/locale/es";
import {useDropzone} from "react-dropzone";
import { toast} from "react-toastify";


import { API_HOST } from "../../../utils/constant";
import { Camera } from "../../../utils/Icons";
import "./EditUserForm.scss";
import {uploadBannerApi, uploadAvatarApi, updateInfoApi} from "../../../api/user";

export default function EditUserForm(props) {
  const {user, setShowModal} = props;
  const [formData, setFormData] = useState(initialValue(user));
  const [loading, setLoading] = useState(false);

  // ++++++++++++ Banner +++++++++++++
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner? `${API_HOST}/obtenerBanner?id=${user.id}` : null
  );

  const [bannerFile, setBannerFile] = useState(null);

  const onDropBanner = useCallback(acceptedFile=>{

    const file = acceptedFile[0];
    console.log("aca es dropbanner: ", URL.createObjectURL(file));
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
    console.log("aca es callback: ", acceptedFile);
  });

  const {getRootProps: getRootBannerProps, getInputProps: getInputBannerProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropBanner
  });

  // ++++++++++++ Avatar +++++++++++++

  const [avatarFile, setAvatarFile] = useState(null);

  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar? `${API_HOST}/obtenerAvatar?id=${user.id}` : null
  );

  const onDropAvatar = useCallback(acceptedFile=> {
    console.log("Aca es acept File: ", acceptedFile);

    const file = acceptedFile[0];
    console.log("aca es avatar: ", URL.createObjectURL(file));
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });

  const {getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop: onDropAvatar
  });

  // ++++++++++++++++++ Fin banner avatar +++++++++++++

  const onChange = e =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("aca es submit banerfile", bannerFile);
    if(bannerFile){
      await uploadBannerApi(bannerFile).catch(()=>{
        toast.error("Error al subir el nuevo banner");
      });
    } 

    if(avatarFile){
      await uploadAvatarApi(avatarFile).catch(()=>{
        toast.error("Error al subir el nuevo avatar");
      });
    }

    await updateInfoApi(formData).then(()=>{
      setShowModal(false);
    }).catch(()=>{
      toast.error("Error al actualizar los datos");
    });

    setLoading(false);

    window.location.reload();

  };

  return (
    <div className="edit-user-form">
      <div className="banner" style={{backgroundImage: `url('${bannerUrl}')`}} {...getRootBannerProps()} >
        <input {...getInputBannerProps()}/>
        <Camera/>
      </div>

      <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')`}} {...getRootAvatarProps()}>
        <input {...getInputAvatarProps()}/>
          <Camera/>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="text" placeholder="Nombre" name="nombre" defaultValue={formData.nombre} onChange={onChange} />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="apellidos"
                defaultValue={formData.apellidos}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="Agrega tu Biografia"
            type="text"
            name="biografia"
            defaultValue={formData.biografia}
            onChange={onChange}
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Control type="text" placeholder="Sitio Web" name="sitioWeb" defaultValue={formData.sitioWeb} onChange={onChange}/>
        </Form.Group>
        
        <Form.Group>
            <Datepicker
            placeholder="Fecha de nacimiento"
            locale={es}
            selected={new Date(formData.fechaNacimiento)}
            onChange={value=>setFormData({...formData, fechaNacimiento:value})}
            ></Datepicker>
        </Form.Group>

        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />} Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValue(user) {
  return {
    nombre: user.nombre? user.nombre : "",
    apellidos: user.apellidos || "",
    biografia: user.biografia || "",
    ubicacion: user.ubicacion || "",
    sitioWeb: user.sitioWeb || "",
    fechaNacimiento: user.fechaNacimiento || ""
  };
}