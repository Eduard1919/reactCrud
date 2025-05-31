import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

interface Item {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  phone: string;
  email: string;
  DOB: string;
}

function TableForm() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [DOB, setDOB] = useState("");

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const addNewItem = async () => {
      const getResponse = await fetch(`http://localhost:3000/posts`, {
        method: "GET",
      });
      const data: Item[] = await getResponse.json();
      await fetch(`http://localhost:3000/posts`, {
        method: "POST",
        body: JSON.stringify({
          id: String(Number(data[data.length - 1]["id"]) + 1),
          name: firstName,
          surname: LastName,
          middleName: middleName,
          phone: phone,
          email: email,
          DOB: DOB,
        }),
      });
    };

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      event.preventDefault();
    } else {
      addNewItem();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            name="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            name="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>middleName</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              placeholder="Middle Name"
              required
              name="middleName"
              onChange={(e) => {
                setMiddleName(e.target.value);
              }}
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Phone number"
            required
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="text"
            placeholder="Date of birth"
            required
            name="DOB"
            onChange={(e) => {
              setDOB(e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid date of birth.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default TableForm;
