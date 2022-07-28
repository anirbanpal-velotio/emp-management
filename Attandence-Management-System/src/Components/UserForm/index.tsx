import { USER_STATE } from "../../models/user.model";
import { Modal, Button } from "react-bootstrap";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Select from "react-select";
import styles from "./index.module.css";
const roles = [
  { value: "DEVELOPER", label: "DEVELOPER" },
  { value: "QA", label: "QA" },
  { value: "DEVOPS", label: "DEVOPS" },
];

export default function UserForm({
  user,
  show,
  handleClose,
  updateUser,
}: {
  user: USER_STATE | null;
  show: boolean;
  handleClose: () => void;
  updateUser: (user: USER_STATE) => Promise<void>;
}) {
  
  const onSubmit: SubmitHandler<USER_STATE> = async (data: USER_STATE) => {
    await updateUser(data);
    reset();
    handleClose();
  };
  const {
    register,
    handleSubmit,
    formState: { errors, },
    control,
    reset,
  } = useForm<USER_STATE>({
    defaultValues: {
      name: user?.name ? user.name : "",
      email: user?.email ? user.email : "",
      password: "",
      dateOfJoining: user?.dateOfJoining ? user.dateOfJoining : "",
      age: user?.age ? user.age : "",
      role: user?.role ? user.role : "",
    },
  });
  
  return (
    <Modal show={show} onHide={()=>{
      reset()
      handleClose()
      }}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-4">
              <label>Name *</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && <span className="error">Name is required</span>}
            </div>
            <div className="col-md-4">
              <label>Age *</label>
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                {...register("age", { required: true })}
              />
              {errors.age && <span className="error">Age is required</span>}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label>Position *</label>
              {/* <input type="text" className="form-control"  placeholder="Position" {...register("position",{required: true})} /> */}
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange } }) => (
                  <Select
                    options={roles}
                    onChange={(val) => onChange(val!.value)}
                  />
                )}
              />

              {errors.role && (
                <span className="error">Position is required</span>
              )}
            </div>
            <div className="col-md-4">
              <label>Email *</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className="col-md-4">
              <label>Password *</label>
              <input
                type="password"
                className="form-control"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="error">Password is required</span>
              )}
            </div>
            <div className="col-md-4">
              <label>DOJ *</label>
              <input
                type="date"
                className="form-control"
                placeholder="Date Of Joining"
                {...register("dateOfJoining", { required: true })}
              />
              {errors.dateOfJoining && (
                <span className="error">DOJ is required</span>
              )}
            </div>
          </div>
          <div className={`${styles.save}`}>
            <Button
              variant="danger"
              className={`${styles.cancel}`}
              onClick={handleClose}
              type="submit"
            >
              Cancel
            </Button>
            <Button variant="primary" className={`${styles.save}`} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
