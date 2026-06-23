import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle, ShieldAlert } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const lockoutUntil = useAuthStore((state) => state.lockoutUntil);
  
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutSecs, setLockoutSecs] = useState(0);

  // Check and run lockout countdown
  useEffect(() => {
    let timer;
    const updateCountdown = () => {
      const now = Date.now();
      if (lockoutUntil && now < lockoutUntil) {
        setLockoutSecs(Math.ceil((lockoutUntil - now) / 1000));
        timer = setTimeout(updateCountdown, 1000);
      } else {
        setLockoutSecs(0);
      }
    };
    updateCountdown();
    return () => clearTimeout(timer);
  }, [lockoutUntil]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    if (lockoutSecs > 0) return;
    
    setIsLoading(true);
    setLoginError('');

    // Small delay to prevent timing attacks
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        if (result.reason === 'locked_out') {
          setLoginError(`Security Lockout: Account suspended due to 3 consecutive failures. Cooldown: ${result.timeRemaining}s.`);
        } else {
          setLoginError('Access Denied: Invalid email or password credentials.');
        }
      }
    } catch {
      setLoginError('A secure authentication system error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = lockoutSecs > 0;

  return (
    <div className="min-h-screen bg-[#070F2B] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(212,168,67,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(26,58,143,0.2) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pnp-gold/5 border border-pnp-gold rounded-full mb-4">
            <Shield className="w-10 h-10 text-pnp-gold" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            AGAPAY
          </h1>
          <p className="text-pnp-gold text-sm font-bold mt-1 uppercase tracking-wide">
            Integrated Incident Reporting &amp; Monitoring System
          </p>
          <p className="text-gray-400 text-xs mt-1 font-semibold">
            Montalban Police Station &bull; Rodriguez, Rizal
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden">
          {/* Authorized Personnel Banner */}
          <div className={`px-6 py-3 flex items-center gap-2 justify-center border-b transition-colors duration-250 ${
            isLocked ? 'bg-[#DC2626] border-red-900 text-white' : 'bg-pnp-navy border-pnp-navy-dark text-pnp-gold'
          }`}>
            {isLocked ? (
              <>
                <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  System Lockout Active ({lockoutSecs}s)
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-pnp-gold" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Authorized Personnel Only
                </span>
              </>
            )}
          </div>

          {/* Form */}
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Station Security Log-On
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your credentials to access the secure console
            </p>

            {loginError && (
              <div className={`mb-4 p-3 border rounded-lg flex items-start gap-2 ${
                isLocked ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span className="text-xs font-medium leading-relaxed">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  Security ID / Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    disabled={isLocked}
                    autoComplete="email"
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50/50 focus:bg-white ${
                      errors.email
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-pnp-gold focus:border-pnp-gold'
                    }`}
                    placeholder="officer@agapay.gov.ph"
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address format',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-650 font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5"
                >
                  Access Code / Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    disabled={isLocked}
                    autoComplete="current-password"
                    className={`w-full pl-10 pr-10 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed bg-gray-50/50 focus:bg-white ${
                      errors.password
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-pnp-gold focus:border-pnp-gold'
                    }`}
                    placeholder="Enter your security access code"
                    {...register('password', {
                      required: 'Access code is required',
                      minLength: {
                        value: 6,
                        message: 'Access code must be at least 6 characters',
                      },
                    })}
                  />
                  <button
                    type="button"
                    disabled={isLocked}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-650 transition-colors disabled:cursor-not-allowed outline-none focus-visible:ring-1 focus-visible:ring-pnp-gold rounded p-0.5 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-650 font-semibold">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading || isLocked}
                className="w-full bg-pnp-navy hover:bg-pnp-navy-light text-white font-bold py-2.5 px-4 rounded-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-pnp-navy focus-visible:ring-offset-2 outline-none cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying Identity...
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="w-5 h-5 text-red-200" />
                    Locked Out ({lockoutSecs}s)
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Verify & Authenticate
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-pnp-gold transition-colors font-semibold focus-visible:ring-1 focus-visible:ring-pnp-gold outline-none rounded p-0.5"
          >
            &larr; Return to Public Landing Page
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-4">
          &copy; {new Date().getFullYear()} AGAPAY &mdash; ISO 27001 Certified Access Control.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
