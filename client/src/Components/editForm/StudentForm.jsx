
const StudentForm = ({ student, setStudent}) => {
  return (
    <form  className="space-y-4">
      {/* Name */} 
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={student.name || ""}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      {/* Class */}
      <div>
        <label htmlFor="class" className="block text-sm font-medium text-gray-700">
          Class:
        </label>
        <input
          type="text"
          id="class"
          name="class"
          value={student.class || ""}
          onChange={(e) => setStudent({ ...student, class: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
    </form>
  );
};

export default StudentForm;
