import React, { useState } from 'react';
import { ArrowLeft,Building, Loader2 } from "lucide-react";
import { BsBriefcaseFill, } from "react-icons/bs"; // ✅ Correct logo icon
import { FaUserGraduate, FaUserPlus  } from "react-icons/fa";

type UserType = 'student' | 'company';
type MessageType = 'success' | 'error';

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  degree: string;
  year: string;
  registrationNo: string;
  linkedinUrl: string;
}

interface CompanyFormData {
  companyName: string;
  companyRegNo: string;
  businessType: string;
  email: string;
  password: string;
  confirmPassword: string;
  contactNo: string;
  employeeCount: string;
  address: string;
}

interface Message {
  text: string;
  type: MessageType;
}

const SignupForm: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const [studentData, setStudentData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    degree: 'bsc',
    year: '',
    registrationNo: '',
    linkedinUrl: '',
  });

  const [companyData, setCompanyData] = useState<CompanyFormData>({
    companyName: '',
    companyRegNo: '',
    businessType: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    employeeCount: '',
    address: '',
  });

  const showMessage = (text: string, type: MessageType) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidLinkedInUrl = (url: string): boolean => {
    if (!url) return true;
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const validateForm = (): boolean => {
    const newErrors = new Set<string>();
    let isValid = true;

    if (userType === 'student') {
      if (!studentData.firstName.trim()) newErrors.add('firstName');
      if (!studentData.lastName.trim()) newErrors.add('lastName');
      if (!studentData.email.trim()) newErrors.add('email');
      if (!studentData.password) newErrors.add('password');
      if (!studentData.confirmPassword) newErrors.add('confirmPassword');
      if (!studentData.department) newErrors.add('department');
      if (!studentData.year) newErrors.add('year');
      if (!studentData.registrationNo.trim()) newErrors.add('registrationNo');

      if (studentData.email && !isValidEmail(studentData.email)) {
        newErrors.add('email');
        showMessage('Please enter a valid email address.', 'error');
        isValid = false;
      }

      if (studentData.password.length < 6) {
        newErrors.add('password');
        showMessage('Password must be at least 6 characters long.', 'error');
        isValid = false;
      }

      if (studentData.password !== studentData.confirmPassword) {
        newErrors.add('confirmPassword');
        showMessage('Passwords do not match.', 'error');
        isValid = false;
      }

      if (studentData.linkedinUrl && !isValidLinkedInUrl(studentData.linkedinUrl)) {
        newErrors.add('linkedinUrl');
        showMessage('Please enter a valid LinkedIn profile URL.', 'error');
        isValid = false;
      }
    } else {
      if (!companyData.companyName.trim()) newErrors.add('companyName');
      if (!companyData.companyRegNo.trim()) newErrors.add('companyRegNo');
      if (!companyData.businessType) newErrors.add('businessType');
      if (!companyData.email.trim()) newErrors.add('email');
      if (!companyData.password) newErrors.add('password');
      if (!companyData.confirmPassword) newErrors.add('confirmPassword');
      if (!companyData.contactNo.trim()) newErrors.add('contactNo');
      if (!companyData.employeeCount) newErrors.add('employeeCount');
      if (!companyData.address.trim()) newErrors.add('address');

      if (companyData.email && !isValidEmail(companyData.email)) {
        newErrors.add('email');
        showMessage('Please enter a valid email address.', 'error');
        isValid = false;
      }

      if (companyData.password.length < 6) {
        newErrors.add('password');
        showMessage('Password must be at least 6 characters long.', 'error');
        isValid = false;
      }

      if (companyData.password !== companyData.confirmPassword) {
        newErrors.add('confirmPassword');
        showMessage('Passwords do not match.', 'error');
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (newErrors.size > 0 && isValid) {
      showMessage('Please fill in all required fields.', 'error');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const payload = userType === 'student'
      ? {
          type: 'student',
          firstName: studentData.firstName.trim(),
          lastName: studentData.lastName.trim(),
          email: studentData.email.trim(),
          password: studentData.password,
          confirmPassword: studentData.confirmPassword,
          degree: studentData.degree,
          department: studentData.department,
          year: studentData.year,
          reg_no: studentData.registrationNo.trim(),
          linkedin: studentData.linkedinUrl.trim(),
        }
      : {
          type: 'company',
          com_name: companyData.companyName.trim(),
          reg_no: companyData.companyRegNo.trim(),
          email: companyData.email.trim(),
          password: companyData.password,
          confirmPassword: companyData.confirmPassword,
          business_type: companyData.businessType,
          contact_no: companyData.contactNo.trim(),
          no_of_employees: companyData.employeeCount,
          address: companyData.address.trim(),
        };

    const endpoint = userType === 'student'
      ? 'http://localhost/WEB_Final_codes/backend/signup-student.php'
      : 'http://localhost/WEB_Final_codes/backend/signup-company.php';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        showMessage(result.message || 'Account created successfully!', 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        showMessage(result.message || 'Error creating account.', 'error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      showMessage('Server error. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentChange = (field: keyof StudentFormData, value: string) => {
    setStudentData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = new Set(prev);
      newErrors.delete(field);
      return newErrors;
    });
  };

  const handleCompanyChange = (field: keyof CompanyFormData, value: string) => {
    setCompanyData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = new Set(prev);
      newErrors.delete(field);
      return newErrors;
    });
  };

  const inputClassName = (fieldName: string) =>
    `w-full px-4 py-3 border-2 rounded-lg text-sm transition-all ${
      errors.has(fieldName)
        ? 'border-red-300 focus:border-red-500'
        : 'border-purple-100 focus:border-purple-600'
    } focus:outline-none focus:ring-4 focus:ring-purple-100`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center p-5">
      <div className="w-full max-w-3xl">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 animate-[slideUp_0.6s_ease-out]">
          {/* Header */}
          <div className="flex items-center mb-8 relative">
            <a
              href="../html/home.html"
              className="absolute left-0 text-purple-700 text-xl p-2 rounded-full hover:bg-purple-100 transition-all hover:-translate-x-0.5"
            >
              <ArrowLeft size={20} />
            </a>
          <div className="flex items-center justify-center gap-4 w-full">
              <BsBriefcaseFill className="text-purple-700 text-3xl" /> {/* ✅ Correct Logo Icon */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">
                GragGig
              </h1>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Your Account</h2>
            <p className="text-gray-600">Join our community today</p>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-4 mb-8 bg-purple-50 p-2 rounded-xl">
            <button
              onClick={() => setUserType('student')}
              className={`flex-1 flex flex-col items-center gap-2 py-5 px-4 rounded-lg transition-all ${
                userType === 'student'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-lg -translate-y-0.5'
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              <FaUserGraduate size={24} />
              <span className="font-semibold text-sm">Student</span>
            </button>
            <button
              onClick={() => setUserType('company')}
              className={`flex-1 flex flex-col items-center gap-2 py-5 px-4 rounded-lg transition-all ${
                userType === 'company'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-lg -translate-y-0.5'
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              <Building size={24} />
              <span className="font-semibold text-sm">Company</span>
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-5 px-4 py-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Form */}
            {userType === 'student' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={studentData.firstName}
                      onChange={(e) => handleStudentChange('firstName', e.target.value)}
                      className={inputClassName('firstName')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={studentData.lastName}
                      onChange={(e) => handleStudentChange('lastName', e.target.value)}
                      className={inputClassName('lastName')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={studentData.email}
                    onChange={(e) => handleStudentChange('email', e.target.value)}
                    className={inputClassName('email')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={studentData.password}
                      onChange={(e) => handleStudentChange('password', e.target.value)}
                      className={inputClassName('password')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={studentData.confirmPassword}
                      onChange={(e) => handleStudentChange('confirmPassword', e.target.value)}
                      className={inputClassName('confirmPassword')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Department
                    </label>
                    <select
                      value={studentData.department}
                      onChange={(e) => handleStudentChange('department', e.target.value)}
                      className={inputClassName('department')}
                    >
                      <option value="">Select Department</option>
                      <option value="science">Science</option>
                      <option value="medicine">Medicine</option>
                      <option value="engineering">Engineering</option>
                      <option value="arts">Arts</option>
                      <option value="management">Management</option>
                      <option value="commerce">Commerce</option>
                      <option value="law">Law</option>
                      <option value="education">Education</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="technology">Technology</option>
                      <option value="architecture">Architecture</option>
                      <option value="computer_science">Computer Science</option>
                      <option value="veterinary">Veterinary Medicine</option>
                      <option value="dental">Dental Sciences</option>
                      <option value="nursing">Nursing</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="allied_health">Allied Health Sciences</option>
                      <option value="fisheries_marine">Fisheries and Marine Sciences</option>
                      <option value="environmental_science">Environmental Science</option>
                      <option value="social_sciences">Social Sciences</option>
                      <option value="humanities">Humanities</option>
                      <option value="indigenous_medicine">Indigenous Medicine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Degree
                    </label>
                    <select
                      value={studentData.degree}
                      onChange={(e) => handleStudentChange('degree', e.target.value)}
                      className={inputClassName('degree')}
                    >
                      <option value="bsc">BSc (Bachelor of Science)</option>
                      <option value="bsc_hons">BSc (Hons)</option>
                      <option value="bsc_engineering">BSc in Engineering</option>
                      <option value="beng">BEng (Bachelor of Engineering)</option>
                      <option value="mbbs">MBBS (Bachelor of Medicine, Bachelor of Surgery)</option>
                      <option value="bds">BDS (Bachelor of Dental Surgery)</option>
                      <option value="bvsc">BVSc (Bachelor of Veterinary Science)</option>
                      <option value="bams">BAMS (Bachelor of Ayurveda Medicine and Surgery)</option>
                      <option value="bpharm">BPharm (Bachelor of Pharmacy)</option>
                      <option value="bsc_nursing">BSc in Nursing</option>
                      <option value="bmlt">BSc in Medical Laboratory Technology (BMLT)</option>
                      <option value="bpt">BSc in Physiotherapy (BPT)</option>
                      <option value="bbm">BBM (Bachelor of Business Management)</option>
                      <option value="bcom">BCom (Bachelor of Commerce)</option>
                      <option value="bba">BBA (Bachelor of Business Administration)</option>
                      <option value="bpa">BPA (Bachelor of Performing Arts)</option>
                      <option value="ba">BA (Bachelor of Arts)</option>
                      <option value="bl">LLB (Bachelor of Laws)</option>
                      <option value="barch">BArch (Bachelor of Architecture)</option>
                      <option value="bit">BIT (Bachelor of Information Technology)</option>
                      <option value="bict">BICT (Bachelor of Information and Communication Technology)</option>
                      <option value="btech">BTech (Bachelor of Technology)</option>
                      <option value="bed">BEd (Bachelor of Education)</option>
                      <option value="bagrisc">BSc in Agricultural Sciences</option>
                      <option value="bfin">BSc in Finance</option>
                      <option value="bacc">BSc in Accounting</option>
                      <option value="bhrm">BSc in Human Resource Management</option>
                      <option value="bent">BSc in Entrepreneurship</option>
                      <option value="bqs">BSc in Quantity Surveying</option>
                      <option value="btown">BSc in Town and Country Planning</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Year</label>
                    <select
                      value={studentData.year}
                      onChange={(e) => handleStudentChange('year', e.target.value)}
                      className={inputClassName('year')}
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      value={studentData.registrationNo}
                      onChange={(e) => handleStudentChange('registrationNo', e.target.value)}
                      className={inputClassName('registrationNo')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={studentData.linkedinUrl}
                    onChange={(e) => handleStudentChange('linkedinUrl', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className={inputClassName('linkedinUrl')}
                  />
                </div>
              </div>
            )}

            {/* Company Form */}
            {userType === 'company' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyData.companyName}
                    onChange={(e) => handleCompanyChange('companyName', e.target.value)}
                    className={inputClassName('companyName')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Company Registration Number
                    </label>
                    <input
                      type="text"
                      value={companyData.companyRegNo}
                      onChange={(e) => handleCompanyChange('companyRegNo', e.target.value)}
                      className={inputClassName('companyRegNo')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Business Type
                    </label>
                    <select
                      value={companyData.businessType}
                      onChange={(e) => handleCompanyChange('businessType', e.target.value)}
                      className={inputClassName('businessType')}
                    >
                      <option value="">Select Business Type</option>
                      <option value="education">Education</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="retail">Retail</option>
                      <option value="finance">Finance</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="hospitality_tourism">Hospitality and Tourism</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="construction_real_estate">Construction and Real Estate</option>
                      <option value="transportation_logistics">Transportation and Logistics</option>
                      <option value="media_entertainment">Media and Entertainment</option>
                      <option value="professional_services">Professional Services</option>
                      <option value="energy_utilities">Energy and Utilities</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="fashion_beauty">Fashion and Beauty</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={companyData.email}
                    onChange={(e) => handleCompanyChange('email', e.target.value)}
                    className={inputClassName('email')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={companyData.password}
                      onChange={(e) => handleCompanyChange('password', e.target.value)}
                      className={inputClassName('password')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={companyData.confirmPassword}
                      onChange={(e) => handleCompanyChange('confirmPassword', e.target.value)}
                      className={inputClassName('confirmPassword')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={companyData.contactNo}
                      onChange={(e) => handleCompanyChange('contactNo', e.target.value)}
                      className={inputClassName('contactNo')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Number of Employees
                    </label>
                    <select
                      value={companyData.employeeCount}
                      onChange={(e) => handleCompanyChange('employeeCount', e.target.value)}
                      className={inputClassName('employeeCount')}
                    >
                      <option value="">Select Range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="501-1000">501-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Company Address
                  </label>
                  <textarea
                    value={companyData.address}
                    onChange={(e) => handleCompanyChange('address', e.target.value)}
                    rows={3}
                    className={inputClassName('address')}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-br from-indigo-500 to-purple-700 text-white py-4 rounded-xl font-semibold text-base hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-purple-100">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="login.html" className="text-purple-700 font-semibold hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SignupForm;