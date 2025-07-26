-- Queensland Study Platform Database Schema
-- Comprehensive schema supporting user management, curriculum, content, progress tracking, and analytics

-- =====================================
-- AUTHENTICATION & USER MANAGEMENT
-- =====================================

-- Users table for authentication and basic user info
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role ENUM('student', 'teacher', 'admin', 'super_admin') DEFAULT 'student',
    subscription_plan ENUM('free', 'student_pro', 'school_license') DEFAULT 'free',
    subscription_status ENUM('active', 'inactive', 'trial', 'cancelled') DEFAULT 'inactive',
    subscription_start_date TIMESTAMP,
    subscription_end_date TIMESTAMP,
    trial_start_date TIMESTAMP,
    trial_end_date TIMESTAMP,
    year_level VARCHAR(10), -- e.g., 'Year 11', 'Year 12'
    school_name VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    profile_image_url TEXT,
    last_login TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences and settings
CREATE TABLE user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    notification_email BOOLEAN DEFAULT TRUE,
    notification_reminders BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    study_goal_hours_per_week INTEGER DEFAULT 10,
    preferred_study_time ENUM('morning', 'afternoon', 'evening', 'night'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- School/Institution management for school licenses
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    subscription_plan ENUM('school_license') DEFAULT 'school_license',
    max_students INTEGER DEFAULT 200,
    account_manager_id UUID REFERENCES users(id),
    billing_contact_name VARCHAR(255),
    billing_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Link users to schools
CREATE TABLE school_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
    student_id VARCHAR(100), -- School's internal student ID
    class_year VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, user_id)
);

-- =====================================
-- CURRICULUM STRUCTURE
-- =====================================

-- Subjects (e.g., Mathematical Methods, English, Physics)
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly name
    description TEXT,
    icon VARCHAR(100), -- Icon identifier
    color VARCHAR(7), -- Hex color code
    year_level VARCHAR(10), -- e.g., 'Year 11-12'
    curriculum_standard VARCHAR(100) DEFAULT 'Queensland Curriculum',
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Units within subjects (e.g., Algebra and Functions, Calculus)
CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit_number INTEGER NOT NULL, -- e.g., 1, 2, 3
    order_index INTEGER DEFAULT 0,
    estimated_hours INTEGER, -- Estimated study hours
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id, unit_number)
);

-- Topics within units (e.g., Functions and Relations, Differentiation)
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    learning_objectives TEXT[], -- Array of learning objectives
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    estimated_hours INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subtopics within topics (e.g., Domain and Range, Function Types)
CREATE TABLE subtopics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0,
    learning_outcomes TEXT[], -- Specific learning outcomes
    key_concepts TEXT[], -- Array of key concepts
    estimated_minutes INTEGER, -- More granular time estimate
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'intermediate',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- CONTENT & STUDY MATERIALS
-- =====================================

-- Questions/Problems
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type ENUM('multiple_choice', 'short_answer', 'long_answer', 'true_false', 'fill_blank') NOT NULL,
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    points INTEGER DEFAULT 1,
    explanation TEXT, -- Detailed explanation/working
    answer_key TEXT NOT NULL, -- Correct answer(s)
    metadata JSONB, -- Additional question metadata
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    reviewed_by UUID REFERENCES users(id),
    review_status ENUM('draft', 'pending', 'approved', 'rejected') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Multiple choice options for questions
CREATE TABLE question_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    order_index INTEGER DEFAULT 0,
    explanation TEXT, -- Why this option is correct/incorrect
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flashcards
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    front_content TEXT NOT NULL,
    back_content TEXT NOT NULL,
    card_type ENUM('text', 'image', 'formula', 'mixed') DEFAULT 'text',
    difficulty_level ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    tags TEXT[], -- Array of tags for categorization
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study Notes
CREATE TABLE study_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, -- Markdown or HTML content
    note_type ENUM('summary', 'detailed', 'formula_sheet', 'example') DEFAULT 'summary',
    tags TEXT[], -- Array of tags
    reading_time_minutes INTEGER, -- Estimated reading time
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Video Content
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    duration_seconds INTEGER,
    video_type ENUM('lesson', 'example', 'review', 'practice') DEFAULT 'lesson',
    transcript TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- QUIZZES & ASSESSMENTS
-- =====================================

-- Quiz definitions
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    quiz_type ENUM('practice', 'assessment', 'review', 'diagnostic') DEFAULT 'practice',
    time_limit_minutes INTEGER,
    total_points INTEGER DEFAULT 0,
    passing_score INTEGER, -- Percentage needed to pass
    difficulty_level ENUM('easy', 'medium', 'hard', 'mixed') DEFAULT 'mixed',
    is_randomized BOOLEAN DEFAULT FALSE, -- Randomize question order
    show_correct_answers BOOLEAN DEFAULT TRUE,
    allow_retakes BOOLEAN DEFAULT TRUE,
    max_attempts INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions assigned to quizzes
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    order_index INTEGER DEFAULT 0,
    points INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(quiz_id, question_id)
);

-- =====================================
-- USER PROGRESS & ANALYTICS
-- =====================================

-- Overall user progress per subject
CREATE TABLE user_subject_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    total_study_time_minutes INTEGER DEFAULT 0,
    last_studied_at TIMESTAMP,
    current_unit_id UUID REFERENCES units(id),
    current_topic_id UUID REFERENCES topics(id),
    current_subtopic_id UUID REFERENCES subtopics(id),
    average_quiz_score DECIMAL(5,2),
    total_quizzes_completed INTEGER DEFAULT 0,
    total_flashcards_reviewed INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subject_id)
);

-- Detailed progress per subtopic
CREATE TABLE user_subtopic_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subtopic_id UUID REFERENCES subtopics(id) ON DELETE CASCADE,
    status ENUM('not_started', 'in_progress', 'completed', 'mastered') DEFAULT 'not_started',
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    study_time_minutes INTEGER DEFAULT 0,
    last_studied_at TIMESTAMP,
    first_started_at TIMESTAMP,
    completed_at TIMESTAMP,
    mastery_score DECIMAL(5,2), -- Score indicating mastery level
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, subtopic_id)
);

-- Quiz attempts and results
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    attempt_number INTEGER DEFAULT 1,
    score INTEGER DEFAULT 0,
    total_possible INTEGER,
    percentage_score DECIMAL(5,2),
    time_taken_seconds INTEGER,
    status ENUM('in_progress', 'completed', 'submitted', 'abandoned') DEFAULT 'in_progress',
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    submitted_at TIMESTAMP,
    answers JSONB, -- Store user answers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Individual question responses within quiz attempts
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    user_answer TEXT,
    is_correct BOOLEAN,
    points_awarded INTEGER DEFAULT 0,
    time_taken_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flashcard review sessions
CREATE TABLE flashcard_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
    difficulty_rating ENUM('easy', 'medium', 'hard') NOT NULL,
    confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 5),
    review_duration_seconds INTEGER,
    next_review_date TIMESTAMP, -- Spaced repetition scheduling
    review_count INTEGER DEFAULT 1,
    streak_count INTEGER DEFAULT 0, -- Consecutive correct reviews
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Study sessions tracking
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
    subtopic_id UUID REFERENCES subtopics(id),
    session_type ENUM('flashcards', 'quiz', 'notes', 'video', 'mixed') NOT NULL,
    duration_minutes INTEGER,
    activities_completed INTEGER DEFAULT 0,
    session_quality ENUM('poor', 'fair', 'good', 'excellent'),
    notes TEXT, -- User's personal notes about the session
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- SUBSCRIPTION & BILLING
-- =====================================

-- Subscription plans definition
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    price_monthly DECIMAL(10,2),
    price_yearly DECIMAL(10,2),
    features JSONB, -- JSON array of features
    max_subjects INTEGER,
    max_flashcards_per_month INTEGER,
    max_quizzes_per_month INTEGER,
    max_notes_per_month INTEGER,
    has_analytics BOOLEAN DEFAULT FALSE,
    has_ai_recommendations BOOLEAN DEFAULT FALSE,
    has_offline_access BOOLEAN DEFAULT FALSE,
    has_priority_support BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment transactions
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'AUD',
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'purchase_order') NOT NULL,
    stripe_payment_intent_id VARCHAR(255),
    status ENUM('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    billing_period ENUM('monthly', 'yearly') DEFAULT 'monthly',
    subscription_plan VARCHAR(100),
    transaction_fee DECIMAL(10,2),
    notes TEXT,
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usage tracking for plan limits
CREATE TABLE usage_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tracking_period DATE NOT NULL, -- YYYY-MM-01 for monthly tracking
    flashcards_created INTEGER DEFAULT 0,
    quizzes_taken INTEGER DEFAULT 0,
    notes_accessed INTEGER DEFAULT 0,
    study_time_minutes INTEGER DEFAULT 0,
    api_calls INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, tracking_period)
);

-- =====================================
-- ADMIN & CONTENT MANAGEMENT
-- =====================================

-- Content review and approval workflow
CREATE TABLE content_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type ENUM('question', 'flashcard', 'note', 'video', 'quiz') NOT NULL,
    content_id UUID NOT NULL, -- References the actual content
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status ENUM('pending', 'approved', 'rejected', 'needs_revision') DEFAULT 'pending',
    review_notes TEXT,
    quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 10),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System-wide settings and configuration
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Can be accessed by non-admin users
    updated_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs for audit trail
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    resource_type VARCHAR(100), -- e.g., 'user', 'question', 'quiz'
    resource_id UUID,
    details JSONB, -- Additional action details
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- NOTIFICATIONS & COMMUNICATION
-- =====================================

-- System notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type ENUM('info', 'success', 'warning', 'error', 'reminder') DEFAULT 'info',
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT, -- Optional URL for notification action
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email templates for automated communications
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_key VARCHAR(255) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_body TEXT NOT NULL,
    text_body TEXT,
    variables TEXT[], -- Array of template variables
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- PERFORMANCE & ANALYTICS
-- =====================================

-- System performance metrics
CREATE TABLE performance_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(255) NOT NULL,
    metric_value DECIMAL(15,6),
    metric_unit VARCHAR(50),
    tags JSONB, -- Additional metadata
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User behavior analytics
CREATE TABLE user_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB,
    session_id UUID,
    page_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- INDEXES FOR PERFORMANCE
-- =====================================

-- User-related indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_plan ON users(subscription_plan);
CREATE INDEX idx_users_role ON users(role);

-- Content structure indexes
CREATE INDEX idx_units_subject_id ON units(subject_id);
CREATE INDEX idx_topics_unit_id ON topics(unit_id);
CREATE INDEX idx_subtopics_topic_id ON subtopics(topic_id);
CREATE INDEX idx_questions_subtopic_id ON questions(subtopic_id);
CREATE INDEX idx_flashcards_subtopic_id ON flashcards(subtopic_id);

-- Progress tracking indexes
CREATE INDEX idx_user_subject_progress_user_id ON user_subject_progress(user_id);
CREATE INDEX idx_user_subtopic_progress_user_id ON user_subtopic_progress(user_id);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Performance indexes
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Analytics indexes
CREATE INDEX idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX idx_user_analytics_event_type ON user_analytics(event_type);
CREATE INDEX idx_user_analytics_created_at ON user_analytics(created_at);

-- =====================================
-- TRIGGERS FOR DATA INTEGRITY
-- =====================================

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update timestamp trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subtopics_updated_at BEFORE UPDATE ON subtopics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate quiz total points when questions are added/removed
CREATE OR REPLACE FUNCTION update_quiz_total_points()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE quizzes 
    SET total_points = (
        SELECT COALESCE(SUM(points), 0) 
        FROM quiz_questions 
        WHERE quiz_id = COALESCE(NEW.quiz_id, OLD.quiz_id)
    )
    WHERE id = COALESCE(NEW.quiz_id, OLD.quiz_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quiz_points_on_question_change 
    AFTER INSERT OR UPDATE OR DELETE ON quiz_questions 
    FOR EACH ROW EXECUTE FUNCTION update_quiz_total_points();

-- =====================================
-- SAMPLE DATA INSERTION
-- =====================================

-- Insert default subscription plans
INSERT INTO subscription_plans (name, description, price_monthly, price_yearly, features, max_subjects, max_flashcards_per_month, max_quizzes_per_month, max_notes_per_month, has_analytics, has_ai_recommendations, has_offline_access) VALUES
('Free', 'Perfect for getting started with your Queensland studies', 0.00, 0.00, '["3 subject access", "50 flashcards per month", "5 practice quizzes per month", "2 study notes per month"]', 3, 50, 5, 2, FALSE, FALSE, FALSE),
('Student Pro', 'Everything you need to excel in Queensland Year 11-12', 19.00, 190.00, '["Unlimited subject access", "Unlimited flashcards", "Unlimited practice quizzes", "Comprehensive study notes", "Progress tracking", "AI-powered recommendations", "Detailed analytics", "Offline access"]', -1, -1, -1, -1, TRUE, TRUE, TRUE),
('School License', 'Perfect for schools and educational institutions', 299.00, 2990.00, '["Everything in Student Pro", "Up to 200 student accounts", "Teacher dashboard", "Class progress monitoring", "Bulk account management", "Custom branding", "Advanced reporting", "Dedicated account manager", "Priority phone support", "Training sessions", "Custom integrations"]', -1, -1, -1, -1, TRUE, TRUE, TRUE);

-- Insert sample subjects
INSERT INTO subjects (name, slug, description, year_level) VALUES
('Mathematical Methods', 'mathematical-methods', 'Master calculus, functions, and statistical analysis for Year 11-12', 'Year 11-12'),
('English', 'english', 'Develop critical thinking and communication skills through literature and language study', 'Year 11-12'),
('Biology', 'biology', 'Explore living systems from molecules to ecosystems', 'Year 11-12'),
('Chemistry', 'chemistry', 'Understand matter, chemical reactions, and molecular structures', 'Year 11-12'),
('Physics', 'physics', 'Investigate the fundamental principles governing matter and energy', 'Year 11-12'),
('Modern History', 'modern-history', 'Analyze significant events and developments in the modern world', 'Year 11-12');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('site_name', 'StudyMate QLD', 'string', 'Website name displayed to users', TRUE),
('maintenance_mode', 'false', 'boolean', 'Enable/disable maintenance mode', FALSE),
('max_file_upload_size', '10485760', 'integer', 'Maximum file upload size in bytes (10MB)', FALSE),
('support_email', 'support@studymateqld.com', 'string', 'Support contact email', TRUE),
('trial_duration_days', '7', 'integer', 'Free trial duration in days', FALSE);

-- Insert email templates
INSERT INTO email_templates (template_key, subject, html_body, text_body, variables) VALUES
('welcome', 'Welcome to StudyMate QLD!', '<h1>Welcome {{first_name}}!</h1><p>Thank you for joining StudyMate QLD. Your journey to academic success starts here.</p>', 'Welcome {{first_name}}! Thank you for joining StudyMate QLD. Your journey to academic success starts here.', ARRAY['first_name', 'email']),
('trial_ending', 'Your Free Trial is Ending Soon', '<h1>Hi {{first_name}},</h1><p>Your 7-day free trial will end in {{days_remaining}} days. Upgrade now to continue your studies!</p>', 'Hi {{first_name}}, Your 7-day free trial will end in {{days_remaining}} days. Upgrade now to continue your studies!', ARRAY['first_name', 'days_remaining']),
('password_reset', 'Reset Your Password', '<h1>Password Reset Request</h1><p>Click the link below to reset your password: {{reset_link}}</p>', 'Password Reset Request: Click the link below to reset your password: {{reset_link}}', ARRAY['first_name', 'reset_link']);
