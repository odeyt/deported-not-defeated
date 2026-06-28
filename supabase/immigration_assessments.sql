-- Run this in Supabase SQL Editor before the first submission
-- Table: immigration_assessments

CREATE TABLE IF NOT EXISTS immigration_assessments (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at              timestamptz NOT NULL DEFAULT now(),
  first_name              text,
  email                   text NOT NULL,
  current_country         text,
  deportation_reason      text,
  deportation_year        text,
  removal_count           text,
  has_citizen_spouse      text,
  has_lpr_spouse          text,
  has_citizen_parent      text,
  has_citizen_child       text,
  has_criminal_conviction text,
  criminal_category       text,
  attempted_illegal_return text,
  outside_us              text,
  has_attorney            text,
  primary_goal            text,
  biggest_concern         text,
  wants_attorney          text,
  consent                 boolean DEFAULT false,
  tags                    text[] DEFAULT '{}',
  answers_json            jsonb
);

-- Index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_immigration_assessments_created_at ON immigration_assessments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_immigration_assessments_email ON immigration_assessments (email);
CREATE INDEX IF NOT EXISTS idx_immigration_assessments_wants_attorney ON immigration_assessments (wants_attorney);
